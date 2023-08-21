import { useFormik } from 'formik';
import { t } from 'i18next';
import { useCallback, useEffect, useRef, useState } from 'react';

import { useWalletSelector } from 'providers/WalletProvider';
import { EAuthModalType } from 'shared/components/modals/auth-modal/types';
import {
  COMMENTS_MAX_LENGTH,
  COMMENTS_REFETCH_TIMEOUT,
  EMPTY_STRING,
  PAGINATION_LIMIT,
} from 'shared/constants';
import { useAppDispatch, useAppSelector } from 'shared/hooks/redux-hooks';
import { EModals } from 'shared/interfaces';
import { useModalContext } from 'shared/providers/ModalsProvider';
import { ESTORAGE_KEYS, getItem } from 'shared/utils/storage';
import YUP from 'shared/utils/yupUtils';
import {
  selectComments,
  selectIsCommentsLoading,
  selectCommentsCount,
} from 'store/selectors/comments';
import {
  clearComments,
  setCommentsEventId,
  setCommentsLoading,
} from 'store/slices/comments';
import {
  connectComments,
  deleteComment,
  disconnectComments,
  getComments,
  getCommentsCount,
  sendComment,
} from 'store/thunks/comments';

export const useCommentsControls = (
  isLiveEvent: boolean,
  eventId: string | null,
  userId: string | null
) => {
  const dispatch = useAppDispatch();
  const listRef = useRef<HTMLDivElement | null>(null);
  const [page, setPage] = useState(1);
  const { openModal: signInWithOnChain } = useWalletSelector();
  const { showModal } = useModalContext();
  const openAuthModal = () =>
    showModal(EModals.AUTH_MODAL, {
      title: EAuthModalType.Comment,
      signInWithOnChain,
    });

  const isShowedUserNameModal = (id: string) =>
    getItem(`${ESTORAGE_KEYS.SHOWED_USER_NAME_MODAL}__${id}`);

  const openUserNameModal = (onSubmit: () => void) =>
    showModal(EModals.USERNAME_MODAL, { onSubmit });

  const comments = useAppSelector(selectComments);
  const isLoading = useAppSelector(selectIsCommentsLoading);
  const commentsCount = useAppSelector(selectCommentsCount);

  const formik = useFormik({
    initialValues: { comment: EMPTY_STRING },
    onSubmit: async ({ comment }, helpers) => {
      helpers.setSubmitting(true);
      dispatch(sendComment({ comment, isLiveEvent })).finally(() => {
        helpers.setSubmitting(false);
        helpers.resetForm();
        listRef.current?.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
      });
    },
    validationSchema: YUP.object({
      comment: YUP.string()
        .max(
          COMMENTS_MAX_LENGTH,
          t('events.validation.tooLongComment', { max: COMMENTS_MAX_LENGTH })
        )
        .required(t('events.validation.requiredComment')),
    }),
  });

  const onCommentChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) =>
      formik.setFieldValue('comment', e.target.value),
    []
  );

  const onCommentCancel = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => formik.handleReset(e),
    []
  );

  const onCommentPost = useCallback(() => {
    if (!userId) {
      openAuthModal();
      return;
    }
    if (!isShowedUserNameModal(userId)) {
      openUserNameModal(formik.handleSubmit);
      return;
    }
    formik.handleSubmit();
  }, [userId]);

  const onCommentDelete = useCallback(
    (id: string) => dispatch(deleteComment({ id, isLiveEvent })),
    []
  );

  const getMoreComments = useCallback(() => setPage((prev) => prev + 1), []);

  useEffect(() => {
    setPage(1);
    dispatch(setCommentsEventId(eventId || null));
    if (isLiveEvent) dispatch(connectComments());
    return () => {
      dispatch(setCommentsEventId(null));
      if (isLiveEvent) dispatch(disconnectComments());
      dispatch(clearComments());
      dispatch(setCommentsLoading(false));
    };
  }, [isLiveEvent, userId]);

  useEffect(() => {
    dispatch(getCommentsCount()).then(() => dispatch(getComments({ page })));
  }, [dispatch, page]);

  useEffect(() => {
    if (comments?.length < PAGINATION_LIMIT - 4) {
      setPage((prev) => prev + 1);
    }
  }, [comments?.length]);

  useEffect(() => {
    if (isLiveEvent) return;
    const interval = setInterval(() => {
      const limit =
        comments?.length < PAGINATION_LIMIT
          ? PAGINATION_LIMIT
          : comments?.length;
      dispatch(getComments({ page: 1, limit }));
    }, COMMENTS_REFETCH_TIMEOUT);

    return () => {
      clearInterval(interval);
    };
  }, [comments?.length, dispatch, isLiveEvent]);

  return {
    listRef,
    getMoreComments,
    onCommentChange,
    onCommentCancel,
    onCommentPost,
    onCommentDelete,
    isFormDisabled:
      !(formik.isValid || formik.dirty) || formik.isSubmitting || isLoading,
    touched: formik.touched.comment,
    error: formik.errors.comment,
    value: formik.values.comment,
    isMoreBtn: comments.length < commentsCount,
    comments,
  };
};
