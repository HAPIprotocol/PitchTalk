export const TELEGRAM_REG_EXP = /(https?:\/\/)?(www[.])?(telegram|t)\.me\/([a-zA-Z0-9_+-]*)\/?$/;

export const IMAGE_URL_REX_EXP = /^http[^?]*.(jpg|jpeg|gif|png|tiff|bmp)(\?(.*))?$/gmi;

const MEDIUM_POST = /(?:https?:)?\/\/medium\.com\/(?:(?:@([A-z0-9]+))|([a-z-]+))\/([a-z0-9\\-]+)-([A-z0-9]+)(?:\?.*)?/
const MEDIUM_POST_SUB = /(?:https?:)?\/\/((?!www)[a-z-]+)\.medium\.com\/([a-z0-9-]+)-([A-z0-9-]+)(?:\?.*)?/;
const MEDIUM_USER = /(?:https?:)?\/\/medium\.com\/@([A-z0-9-]+)(?:\?.*)?/;
const MEDIUM_USER_BY_ID = /(?:https?:)?\/\/medium\.com\/u\/([A-z0-9]+)(?:\?.*)?/;
const MEDIUM_EXTRA = /https?:\/\/([A-z0-9]+|u\/[A-z0-9]+\.)?.?medium\.com\/?([A-z0-9]+|u\/[A-z0-9]+)?\??.*/;

export const MEDIUM_COMBINED_REGEX = new RegExp(`(${MEDIUM_POST.source})|(${MEDIUM_POST_SUB.source})|(${MEDIUM_USER.source})|(${MEDIUM_USER_BY_ID.source})|(${MEDIUM_EXTRA.source})`)

const TWITTER_USER = /(?:https?:)?\/\/(?:[A-z]+\.)?twitter\.com\/@?(?!home|share|privacy|tos)([A-z0-9_]+)\/?/;
const TWITTER_STATUS = /(?:https?:)?\/\/(?:[A-z]+\.)?twitter\.com\/@?([A-z0-9_]+)\/status\/([0-9]+)\/?/;

export const TWITTER_COMBINED_REGEX = new RegExp(`(${TWITTER_USER.source})|(${TWITTER_STATUS.source})`)

const DISCORD = /(https?:\/\/)?(www\.)?(discord\.(gg|io|me|li)|discordapp\.com\/invite)\/.+[a-z]?$/;
const DISCORD_INVITE = /(https:\/\/)?(www\.)?(((discord(app)?)?\.com\/invite)|((discord(app)?)?\.gg))\/(?<invite>.+)/

export const DISCORD_REG_EXP = new RegExp(`(${DISCORD.source})|(${DISCORD_INVITE.source})`)

export const LINKEDIN_REG_EXP = /^(http(s)?:\/\/)?([\w]+\.)?linkedin\.com\/(pub|in|profile)\/([-a-zA-Z0-9]+)\/*/gm

export const NEAR_SOCIAL_REG_EXP = /^.*near.social.*$/;