import { AllowedMentions, Application, Channel, Component, GuildMember, integer, Internal, MessageInteraction, Reaction, RoleSubscriptionData, snowflake, Sticker, timestamp, User } from '.'

/** https://discord.com/developers/docs/resources/channel#message-object-message-structure */
export interface Message {
  /** id of the message */
  id: snowflake
  /** id of the channel the message was sent in */
  channel_id: snowflake
  /** id of the guild the message was sent in */
  guild_id?: snowflake
  /** the author of this message (not guaranteed to be a valid user, see below) */
  author: User
  /** member properties for this message's author */
  member?: Partial<GuildMember>
  /** contents of the message */
  content: string
  /** when this message was sent */
  timestamp: timestamp
  /** when this message was edited (or null if never) */
  edited_timestamp?: timestamp
  /** whether this was a TTS message */
  tts: boolean
  /** whether this message mentions everyone */
  mention_everyone: boolean
  /** users specifically mentioned in the message */
  mentions: User[]
  /** roles specifically mentioned in this message */
  mention_roles: snowflake[]
  /** channels specifically mentioned in this message */
  mention_channels?: ChannelMention[]
  /** any attached files */
  attachments: Attachment[]
  /** any embedded content */
  embeds: Embed[]
  /** reactions to the message */
  reactions?: Reaction[]
  /** used for validating a message was sent */
  nonce?: integer | string
  /** whether this message is pinned */
  pinned: boolean
  /** if the message is generated by a webhook, this is the webhook's id */
  webhook_id?: snowflake
  /** type of message */
  type: Message.Type
  /** sent with Rich Presence-related chat embeds */
  activity?: Message.Activity
  /** sent with Rich Presence-related chat embeds */
  application?: Partial<Application>
  /** if the message is a response to an Interaction, this is the id of the interaction's application */
  application_id?: snowflake
  /** data showing the source of a crosspost, channel follow add, pin, or reply message */
  message_reference?: Message.Reference
  /** message flags combined as a bitfield */
  flags?: integer
  /** the message associated with the message_reference */
  referenced_message?: Message
  /** sent if the message is a response to an Interaction */
  interaction?: MessageInteraction
  /** the thread that was started from this message, includes thread member object */
  thread?: Channel
  /** sent if the message contains components like buttons, action rows, or other interactive components */
  components?: Component[]
  /** sent if the message contains stickers */
  sticker_items?: Sticker.Item[]
  /** a generally increasing integer (there may be gaps or duplicates) that represents the approximate position of the message in a thread, it can be used to estimate the relative position of the message in a thread in company with total_message_sent on parent thread */
  position?: integer
  /** data of the role subscription purchase or renewal that prompted this ROLE_SUBSCRIPTION_PURCHASE message */
  role_subscription_data?: RoleSubscriptionData
}

export namespace Message {
  /** https://discord.com/developers/docs/resources/channel#message-object-message-types */
  export enum Type {
    DEFAULT = 0,
    RECIPIENT_ADD = 1,
    RECIPIENT_REMOVE = 2,
    CALL = 3,
    CHANNEL_NAME_CHANGE = 4,
    CHANNEL_ICON_CHANGE = 5,
    CHANNEL_PINNED_MESSAGE = 6,
    GUILD_MEMBER_JOIN = 7,
    USER_PREMIUM_GUILD_SUBSCRIPTION = 8,
    USER_PREMIUM_GUILD_SUBSCRIPTION_TIER_1 = 9,
    USER_PREMIUM_GUILD_SUBSCRIPTION_TIER_2 = 10,
    USER_PREMIUM_GUILD_SUBSCRIPTION_TIER_3 = 11,
    CHANNEL_FOLLOW_ADD = 12,
    GUILD_DISCOVERY_DISQUALIFIED = 14,
    GUILD_DISCOVERY_REQUALIFIED = 15,
    GUILD_DISCOVERY_GRACE_PERIOD_INITIAL_WARNING = 16,
    GUILD_DISCOVERY_GRACE_PERIOD_FINAL_WARNING = 17,
    THREAD_CREATED = 18,
    REPLY = 19,
    CHAT_INPUT_COMMAND = 20,
    THREAD_STARTER_MESSAGE = 21,
    GUILD_INVITE_REMINDER = 22,
    CONTEXT_MENU_COMMAND = 23,
    AUTO_MODERATION_ACTION = 24,
    ROLE_SUBSCRIPTION_PURCHASE = 25,
    INTERACTION_PREMIUM_UPSELL = 26,
    GUILD_APPLICATION_PREMIUM_SUBSCRIPTION = 32,
  }

  /** https://discord.com/developers/docs/resources/channel#message-object-message-activity-structure */
  export interface Activity {
    /** type of message activity */
    type: ActivityType
    /** party_id from a Rich Presence event */
    party_id?: string
  }

  /** https://discord.com/developers/docs/resources/channel#message-object-message-activity-types */
  export enum ActivityType {
    JOIN = 1,
    SPECTATE = 2,
    LISTEN = 3,
    JOIN_REQUEST = 5,
  }

  /** https://discord.com/developers/docs/resources/channel#message-object-message-flags */
  export enum Flag {
    /** this message has been published to subscribed channels (via Channel Following) */
    CROSSPOSTED = 1 << 0,
    /** this message originated from a message in another channel (via Channel Following) */
    IS_CROSSPOST = 1 << 1,
    /** do not include any embeds when serializing this message */
    SUPPRESS_EMBEDS = 1 << 2,
    /** the source message for this crosspost has been deleted (via Channel Following) */
    SOURCE_MESSAGE_DELETED = 1 << 3,
    /** this message came from the urgent message system */
    URGENT = 1 << 4,
    /** this message has an associated thread, with the same id as the message */
    HAS_THREAD = 1 << 5,
    /** this message is only visible to the user who invoked the Interaction */
    EPHEMERAL = 1 << 6,
    /** this message is an Interaction Response and the bot is "thinking" */
    LOADING = 1 << 7,
    /** this message failed to mention some roles and add their members to the thread */
    FAILED_TO_MENTION_SOME_ROLES_IN_THREAD = 1 << 8,
  }

  /** https://discord.com/developers/docs/resources/channel#message-reference-object-message-reference-structure */
  export interface Reference {
    /** id of the originating message */
    message_id?: snowflake
    /** id of the originating message's channel */
    channel_id?: snowflake
    /** id of the originating message's guild */
    guild_id?: snowflake
    /** when sending, whether to error if the referenced message doesn't exist instead of sending as a normal (non-reply) message, default true */
    fail_if_not_exists?: boolean
  }

  /** https://discord.com/developers/docs/resources/channel#get-channel-messages-query-string-params */
  export interface GetParams {
    /** get messages around this message ID */
    around?: snowflake
    /** get messages before this message ID */
    before?: snowflake
    /** get messages after this message ID */
    after?: snowflake
    /** max number of messages to return (1-100) */
    limit?: integer
  }

  /** https://discord.com/developers/docs/resources/channel#create-message-jsonform-params */
  export interface CreateParams extends EditParams {
    /** true if this is a TTS message */
    tts: boolean
    /** include to make your message a reply */
    message_reference: Reference
    /** IDs of up to 3 stickers in the server to send in the message */
    sticker_ids: snowflake[]
  }

  /** https://discord.com/developers/docs/resources/channel#edit-message-jsonform-params */
  export interface EditParams {
    /** the message contents (up to 2000 characters) */
    content?: string
    /** embedded rich content (up to 6000 characters) */
    embeds?: Embed[]
    /** edit the flags of a message (only SUPPRESS_EMBEDS can currently be set/unset) */
    flags?: integer
    /** allowed mentions for the message */
    allowed_mentions?: AllowedMentions
    /** the components to include with the message */
    components?: Component[]
    /** the contents of the file being sent/edited */
    files?: any
    /** JSON encoded body of non-file params (multipart/form-data only) */
    payload_json?: string
    /** attached files to keep and possible descriptions for new files */
    attachments?: Attachment[]
  }

  /** https://discord.com/developers/docs/resources/channel#bulk-delete-messages-json-params */
  export interface BulkDeleteParams {
    /** an array of message ids to delete (2-100) */
    messages: snowflake[]
  }
}

/** https://discord.com/developers/docs/resources/channel#embed-object-embed-structure */
export interface Embed {
  /** title of embed */
  title?: string
  /** type of embed (always "rich" for webhook embeds) */
  type?: string
  /** description of embed */
  description?: string
  /** url of embed */
  url?: string
  /** timestamp of embed content */
  timestamp?: timestamp
  /** color code of the embed */
  color?: integer
  /** footer information */
  footer?: Embed.Footer
  /** image information */
  image?: Embed.Image
  /** thumbnail information */
  thumbnail?: Embed.Thumbnail
  /** video information */
  video?: Embed.Video
  /** provider information */
  provider?: Embed.Provider
  /** author information */
  author?: Embed.Author
  /** fields information */
  fields?: Embed.Field[]
}

export namespace Embed {
  /** https://discord.com/developers/docs/resources/channel#embed-object-embed-thumbnail-structure */
  export interface Thumbnail {
    /** source url of thumbnail (only supports http(s) and attachments) */
    url: string
    /** a proxied url of the thumbnail */
    proxy_url?: string
    /** height of thumbnail */
    height?: integer
    /** width of thumbnail */
    width?: integer
  }

  /** https://discord.com/developers/docs/resources/channel#embed-object-embed-video-structure */
  export interface Video {
    /** source url of video */
    url?: string
    /** a proxied url of the video */
    proxy_url?: string
    /** height of video */
    height?: integer
    /** width of video */
    width?: integer
  }

  /** https://discord.com/developers/docs/resources/channel#embed-object-embed-image-structure */
  export interface Image {
    /** source url of image (only supports http(s) and attachments) */
    url: string
    /** a proxied url of the image */
    proxy_url?: string
    /** height of image */
    height?: integer
    /** width of image */
    width?: integer
  }

  /** https://discord.com/developers/docs/resources/channel#embed-object-embed-provider-structure */
  export interface Provider {
    /** name of provider */
    name?: string
    /** url of provider */
    url?: string
  }

  /** https://discord.com/developers/docs/resources/channel#embed-object-embed-author-structure */
  export interface Author {
    /** name of author */
    name: string
    /** url of author */
    url?: string
    /** url of author icon (only supports http(s) and attachments) */
    icon_url?: string
    /** a proxied url of author icon */
    proxy_icon_url?: string
  }

  /** https://discord.com/developers/docs/resources/channel#embed-object-embed-footer-structure */
  export interface Footer {
    /** footer text */
    text: string
    /** url of footer icon (only supports http(s) and attachments) */
    icon_url?: string
    /** a proxied url of footer icon */
    proxy_icon_url?: string
  }

  /** https://discord.com/developers/docs/resources/channel#embed-object-embed-field-structure */
  export interface Field {
    /** name of the field */
    name: string
    /** value of the field */
    value: string
    /** whether or not this field should display inline */
    inline?: boolean
  }
}

/** https://discord.com/developers/docs/resources/channel#attachment-object-attachment-structure */
export interface Attachment {
  /** attachment id */
  id: snowflake
  /** name of file attached */
  filename: string
  /** the attachment's media type */
  content_type?: string
  /** size of file in bytes */
  size: integer
  /** source url of file */
  url: string
  /** a proxied url of file */
  proxy_url: string
  /** height of file (if image) */
  height?: integer
  /** width of file (if image) */
  width?: integer
  /** whether this attachment is ephemeral */
  ephemeral?: boolean
}

/** https://discord.com/developers/docs/resources/channel#channel-mention-object-channel-mention-structure */
export interface ChannelMention {
  /** id of the channel */
  id: snowflake
  /** id of the guild containing the channel */
  guild_id: snowflake
  /** the type of channel */
  type: Channel.Type
  /** the name of the channel */
  name: string
}

export namespace Message {
  export namespace Event {
    export interface Create extends Message {}

    export interface Update extends Message {}

    /** https://discord.com/developers/docs/topics/gateway-events#message-delete-message-delete-event-fields */
    export interface Delete {
      /** the id of the message */
      id: snowflake
      /** the id of the channel */
      channel_id: snowflake
      /** the id of the guild */
      guild_id?: snowflake
    }

    /** https://discord.com/developers/docs/topics/gateway-events#message-delete-bulk-message-delete-bulk-event-fields */
    export interface DeleteBulk {
      /** the ids of the messages */
      ids: snowflake[]
      /** the id of the channel */
      channel_id: snowflake
      /** the id of the guild */
      guild_id?: snowflake
    }
  }
}

declare module './gateway' {
  interface GatewayEvents {
    /** message was created */
    MESSAGE_CREATE: Message.Event.Create
    /** message was edited */
    MESSAGE_UPDATE: Message.Event.Update
    /** message was deleted */
    MESSAGE_DELETE: Message.Event.Delete
    /** multiple messages were deleted at once */
    MESSAGE_DELETE_BULK: Message.Event.DeleteBulk
  }
}

declare module './internal' {
  interface Internal {
    /**
     * Returns the messages for a channel. If operating on a guild channel, this endpoint requires the VIEW_CHANNEL permission to be present on the current user. If the current user is missing the 'READ_MESSAGE_HISTORY' permission in the channel then this will return no messages (since they cannot read the message history). Returns an array of message objects on success.
     * @see https://discord.com/developers/docs/resources/channel#get-channel-messages
     */
    getChannelMessages(channel_id: snowflake, params?: Message.GetParams): Promise<Message[]>
    /**
     * Returns a specific message in the channel. If operating on a guild channel, this endpoint requires the 'READ_MESSAGE_HISTORY' permission to be present on the current user. Returns a message object on success.
     * @see https://discord.com/developers/docs/resources/channel#get-channel-message
     */
    getChannelMessage(channel_id: snowflake, message_id: snowflake): Promise<Message>
    /**
     * Post a message to a guild text or DM channel. Returns a message object. Fires a Message Create Gateway event. See message formatting for more information on how to properly format messages.
     * @see https://discord.com/developers/docs/resources/channel#create-message
     */
    createMessage(channel_id: snowflake, params: Message.CreateParams): Promise<Message>
    /**
     * Crosspost a message in a News Channel to following channels. This endpoint requires the 'SEND_MESSAGES' permission, if the current user sent the message, or additionally the 'MANAGE_MESSAGES' permission, for all other messages, to be present for the current user.
     * @see https://discord.com/developers/docs/resources/channel#crosspost-message
     */
    crosspostMessage(channel_id: snowflake, message_id: snowflake): Promise<Message>
    /**
     * Edit a previously sent message. The fields content, embeds, and flags can be edited by the original message author. Other users can only edit flags and only if they have the MANAGE_MESSAGES permission in the corresponding channel. When specifying flags, ensure to include all previously set flags/bits in addition to ones that you are modifying. Only flags documented in the table below may be modified by users (unsupported flag changes are currently ignored without error).
     * @see https://discord.com/developers/docs/resources/channel#edit-message
     */
    editMessage(channel_id: snowflake, message_id: snowflake, params: Message.EditParams): Promise<Message>
    /**
     * Delete a message. If operating on a guild channel and trying to delete a message that was not sent by the current user, this endpoint requires the MANAGE_MESSAGES permission. Returns a 204 empty response on success. Fires a Message Delete Gateway event.
     * @see https://discord.com/developers/docs/resources/channel#delete-message
     */
    deleteMessage(channel_id: snowflake, message_id: snowflake): Promise<void>
    /**
     * Delete multiple messages in a single request. This endpoint can only be used on guild channels and requires the MANAGE_MESSAGES permission. Returns a 204 empty response on success. Fires a Message Delete Bulk Gateway event.
     * @see https://discord.com/developers/docs/resources/channel#bulk-delete-messages
     */
    bulkDeleteMessages(channel_id: snowflake, params: Message.BulkDeleteParams): Promise<void>
    /**
     * Returns all pinned messages in the channel as an array of message objects.
     * @see https://discord.com/developers/docs/resources/channel#get-pinned-messages
     */
    getPinnedMessages(channel_id: snowflake): Promise<Message[]>
    /**
     * Pin a message in a channel. Requires the MANAGE_MESSAGES permission. Returns a 204 empty response on success.
     * @see https://discord.com/developers/docs/resources/channel#pin-message
     */
    pinMessage(channel_id: snowflake, message_id: snowflake): Promise<void>
    /**
     * Unpin a message in a channel. Requires the MANAGE_MESSAGES permission. Returns a 204 empty response on success.
     * @see https://discord.com/developers/docs/resources/channel#unpin-message
     */
    unpinMessage(channel_id: snowflake, message_id: snowflake): Promise<void>
  }
}

Internal.define({
  '/channels/{channel.id}/messages': {
    GET: 'getChannelMessages',
    POST: 'createMessage',
  },
  '/channels/{channel.id}/messages/{message.id}': {
    GET: 'getChannelMessage',
    PATCH: 'editMessage',
    DELETE: 'deleteMessage',
  },
  '/channels/{channel.id}/messages/{message.id}/crosspost': {
    POST: 'crosspostMessage',
  },
  '/channels/{channel.id}/messages/bulk-delete': {
    POST: 'bulkDeleteMessages',
  },
  '/channels/{channel.id}/pins': {
    GET: 'getPinnedMessages',
  },
  '/channels/{channel.id}/pins/{message.id}': {
    PUT: 'pinMessage',
    DELETE: 'unpinMessage',
  },
})
