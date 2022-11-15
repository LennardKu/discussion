
# Discussion

A brief description of what this project does and who it's for

Discussion.js is a comment platform to interact with you're customers your website.


## API Reference

#### Get comments

```http
  GET https://api.kuenenwebsites.com/discussion/get/
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `api` | `string` | **Required**. Your API key |
| `uuid` | `string` | **Required**. Your discussion uuid |
| `limit` | `number` | **Required**. Maximum to receive (Max 35) |
| `offset` | `number` |  |


#### Get single comment

```http
  GET https://api.kuenenwebsites.com/discussion/getSingle/
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `uuid`      | `string` | **Required**. uuid of item to fetch |


```http
  GET https://api.kuenenwebsites.com/discussion/post/
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `api`      | `string` | **Required**. Api key |
| `fieldUuid`      | `string` | **Required**. Comment field uuid |
| `parent`      | `string` | parent id |
| `message`      | `string` | **Required**. message |

delete

## Deployment

How to use this project

### Site Access
    1. Login add https://login.kuenenwebsites.com
    2. Create a project ( https://discussion.kuenenwebsites.com/create/project/ )
    3. Copy and paste the given code inside you're head element 

### Creating comment field
    1. https://discussion.kuenenwebsites.com/project/{projectUuid}/new/field/
    2. Copy and paste the given code where you want people to comment



