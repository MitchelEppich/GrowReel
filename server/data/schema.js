const { makeExecutableSchema } = require("graphql-tools");
const resolvers = require("./resolvers");

const typeDefs = `
type Query {
  user(_id: String, jwt: String): User
  list(key: String): List
  video(title: String, _id: String, user: String): Video
  comment(_id: String, user: String): Comment
  emailRequest(_id: String): EmailRequest
  historyElement(_id: String): HistoryElement
  report(_id: String): Report
  global(recordFrom: String): Global
  allComments(filter: CommentFilter, cursor: Int, limit: Int): [Comment]!
  allUsers(filter: UserFilter): [User]!
  allVideos(filter: VideoFilter, cursor: Int, limit: Int, sort: String, hasAccess: Boolean): [Video]!
  allLists(filter: ListFilter): [List]!
  allHistoryElements(filter: HistoryElementFilter): [HistoryElement]!
  allReports(filter: ReportFilter): [Report]!
  verifyToken: User

  userMessages(username: String): [Message]
}
input VideoFilter {
  OR: [VideoFilter!]
  description_contains: String
  url_contains: String
  title_contains: String
  user_contains: String
  username_contains: String
  tags_contains: [String]
  id_contains: [String]
  longer_than: Int
  shorter_than: Int
  posted_within: Int
  params: String
}
input ListFilter {
  OR: [ListFilter!]
  key_contains: String
}
input ReportFilter {
  OR: [ReportFilter!]
  type_equals: String
  body_contains: String
}
input UserFilter {
  OR: [UserFilter!]
  username_contains: String
  username_equals: String
  email_contains: String
  email_equals: String
  id_contains: String
}
input HistoryElementFilter {
  OR: [HistoryElementFilter!]
  user_contains: String
}
input CommentFilter {
  OR: [CommentFilter!]
  video_equals: String
  id_contains: String
}
type Video {
  _id: String
  title: String
  user: User
  duration: Int
  likes: [User]
  createdAt: String
  comments: [Comment]
  tags: [String]
  views: Int
  description: String
  path: String
  has_thumbnail: Boolean
  ad: Boolean
  live_url: String
  feature: Boolean
  disable: Boolean
  mature: Boolean
  monetize: Boolean
  state: Int
}
input VideoInput {
  id: String
  title: String
  user: String
  duration: Int
  description: String
  path: String
  has_thumbnail: Boolean
  tags: [String]
  _username: String
  ad: Boolean
  feature: Boolean
  mature: Boolean
  monetize: Boolean
  state: Int
  disable: Boolean
}
type Report {
  _id: String
  body: String
  type: String
}
type List {
  key: String
  videos: [Video]
  regex: String
  sort: String
  url: String
  icon: String
  href: String
  minLimit: Int
  maxLimit: Int
}
type User {
    _id: String
    email: String
    username: String
    likes: [Video]
    jwt: String
    subscriptions: [User]
    subscribers: [User]
    history: [HistoryElement]
    description: String
    total_likes: Float
    total_views: Float
    ig_url: String
    fb_url: String
    tw_url: String
    password: String
    has_avatar: Boolean
    feature_path: String
    age_verified: Boolean
    admin: Boolean
    messages: [String]
    createdAt: String
}

type HistoryElement {
  _id: String
  viewedAt: String
  user: User
  video: Video
}

input UserInput {
  id: String
  email: String
  username: String
  password: String
  description: String
  tw_url: String
  fb_url: String
  ig_url: String
  userID: String
  new_view: Boolean
  new_like: Boolean
  feature_path: String
  has_avatar: Boolean
  age_verified: Boolean
  admin: Boolean
  message: String
}

type S3Payload {
  signedRequest: String
  url: String
  objects: [String]
}
input S3PayloadInput {
  filename: String
  filetype: String
  bucket: String
}
type Comment {
  _id: String
  body: String
  user: User
  createdAt: String
  video: Video
  upvotes: [User]
  downvotes: [User]
  edited: Boolean
  editedAt: String
  flags: [User]
  _type: String
}
input CommentInput {
  _id: String
  body: String
  user: String
  upvotes: [String]
  downvotes: [String]
  video: String
  flags: [String]
  isUpvote: Boolean
}
type Subscription {
  commentAdded(video: String): Comment
}

input ToggleSubscribeInput {
  userID: String!
  oUserID: String!
}

input AppendVoteInput {
  commentID: String!
  userID: String
  isUpvote: Boolean
}

input ListInput {
  key: String!
  videos: [String]!
  url: String!
  icon: String!
  href: String!
}

input CreateHistoryElementInput {
  userID: String! 
  videoID: String!
}

input EmailInput {
  email: String
  type: String
}

type EmailRequest {
  _id: String
  type: String
  email: String
  expireAt: String
}

input EmailRequestInput {
  id: String
  type: String
  email: String
}

input ReportInput {
  body: String
  type: String
}

type Global {
  _id: String
  trends: [ActivityRecord]
  activity: [ActivityRecord]
  recordFrom: String
  period: String
}

input GlobalInput {
  tags: [String]
  videos: [String]
  period: String
  new_view: Boolean
  new_like: Boolean
}

type ActivityRecord {
  _id: String
  key: String
  views: Int
  likes: Int
}

input ActivityRecordInput {
  key: String
  new_view: Boolean
  new_like: Boolean
}

type Message {
  _id: String
    key: String,
  body: String,
  recipient: [String],
  subject: String,
  sentAt: String
  updatedAt: String
  sender: String
}

input MessageInput {
  key: String,
  body: String,
  recipient: [String],
  subject: String,
  sender: String
}

type Mutation {
  createComment(input: CommentInput!): Comment
  destroyComment(input: CommentInput!): Comment
  updateComment(input: CommentInput!): Comment
  appendVoteComment(input: AppendVoteInput!): Comment

  createVideo(input: VideoInput!): Video
  updateVideo(input: VideoInput!): Video
  deleteVideo(path: String!): Video
  toggleLikeVideo(input: VideoInput!): Video
  appendView(input: VideoInput!): Video
  applyVideoTags(input: VideoInput!): Video

  createList(input: ListInput!): List

  login(input: UserInput!): User
  register(input: UserInput!): User
  destroyUser(id: String!): User
  updateUser(input: UserInput!): User

  toggleSubscribeUser(input: ToggleSubscribeInput!): User
  
  createHistoryElement(input: CreateHistoryElementInput!): User

  signS3(input: S3PayloadInput!): S3Payload
  getListS3(input: S3PayloadInput!): S3Payload
  deleteS3(input: S3PayloadInput!): S3Payload

  createEmailRequest(input: EmailRequestInput!): EmailRequest
  destroyEmailRequest(input: EmailRequestInput!): EmailRequest

  createReport(input: ReportInput!): Report

  sendEmail(input: EmailInput!): EmailRequest
  createPasswordResetURL(email: String!): String

  upsertMessage(input: MessageInput!): String

  createGlobal: Global
  upsertGlobal(input: GlobalInput): Global
}
`;

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

module.exports = schema;
