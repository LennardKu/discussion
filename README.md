## !! --- NOT ACTIVE YET -- !!

[![Keep me updated](https://img.shields.io/badge/Keep%20me%20updated-red)](https://discussion.lennardkuenen.dev/newsletter/)

```
  1. Fase: Development
  2. Fase: Testing
  3. Fase: Deployment
```

# Discussion

A brief description of what this project does and who it's for

Discussion.js is a comment platform to interact with you're customers your website.


## API Reference

#### Get comments

```http
  GET https://api.lennardkuenen.dev/discussion/v3/posts/{apiKey}/{fieldId}/
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `api` | `string` | **Required**. Your API key |
| `uuid` | `string` | **Required**. Your discussion uuid |
| `limit` | `number` | **Required**. Maximum to receive (Max 35) |
| `offset` | `number` |  |


#### Get single comment

```http
  GET https://api.lennardkuenen.dev/discussion/v3/singlePost/{apiKey}/{fieldId}/
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `uuid`      | `string` | **Required**. uuid of item to fetch |


```http
  GET https://api.lennardkuenen.dev/discussion/v3/post/{apiKey}/{fieldId}/
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
    1. Login add https://login.lennardkuenen.dev
    2. Create a project ( https://discussion.lennardkuenen.dev/create/project/ )
    3. Copy and paste the given code inside you're head element 

### Creating comment field
    1. https://discussion.lennardkuenen.dev/project/{projectUuid}/new/field/
    2. Copy and paste the given code where you want people to comment




## Usage/Examples

## Example config script
```html
<script>
  (function(){
    var versionUpdate = (new Date()).getTime(),
    discussionInit = document.createElement( "script" );
    discussionInit.src = `https://cdn.lennardkuenen.dev/scripts/js/discussion-v2.js?v=${versionUpdate}`;
    discussionInit.setAttribute('defer',true);
    discussionInit.setAttribute('siteKey','siteKey');
    document.getElementsByTagName( "head" )[0].appendChild( discussionInit );
  })();
</script>
```
## Reload content

```js
discussion.reload();
```

## 🔗 Links
[![portfolio](https://img.shields.io/badge/Patreon-000?style=for-the-badge&logo=ko-fi&logoColor=white)](https://patreon.com/)
[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/lennard-kuenen/)
[![twitter](https://img.shields.io/badge/twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white)](https://twitter.com/Lennardk1325)

