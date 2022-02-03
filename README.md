# hypepack

A node.js library for the Minecraft Hypixel Server

## Dependencies

- Node Fetch
- Prismarine-NBT

## Usage

### Importing Library

You may want to rename the file to something else besides index.js, but navigate to the file in your require statement to properly import the Hype Class

```js
const Hype = require('hypepack');
```

### Instance of Hype Class

To instantiate the Hype Class you must provide an api key.

```js
const hype = new Hype('my-api-key');
```

### Methods

#### hype.getPlayerCount()

- Returns: *Promise*
- Arguments: N/A
- Description: Returns the player count

#### hype.getGuildIDByName(name)

- Returns: *Promise*
- Arguments: *String*
- Description: Returns the guild ID if found by name

#### hype.getGuildByUUID(uuid)

- Returns: *Promise*
- Arguments: *String*
- Description: Returns the guild ID if found by uuid

#### hype.getGuild(options)

- Returns: *Promise*
- Arguments: *Object*
- Description: Takes an object as an argument with this kind of format:

  ```js
  {
    name: "",
    id: "",
    player: ""
  }
  ```

  Will throw an error if incorrectly formatted object is passed in

#### hype.getStatus(uuid)

- Returns: *Promise*
- Arguments: *String*
- Description: Returns the status based off uuid

#### hype.getWatchDog()

- Returns: *Promise*
- Arguments: N/A
- Description: Returns the watch dog

#### hype.getPlayer(username)

- Returns: *Promise*
- Arguments: *String*
- Description: Returns the player data from mojang

#### hype.getLeaderboard(game)

- Returns: *Promise*
- Arguments: *String*
- Description: Returns the leaderboards based off the game title, if game is not provided, will return entire leaderboard

#### hype.getRecentGames(uuid)

- Returns: *Promise*
- Arguments: *String*
- Description: Returns recent games based off uuid

#### hype.getGameCounts(game)

- Returns: *Promise*
- Arguments: *String*
- Description: Returns the game counts, if no game is provided, will return all counts

#### hype.getBoosters()

- Returns: *Promise*
- Arguments: N/A
- Description: Returns boosters

#### hype.getFriends(uuid)

- Returns: *Promise*
- Arguments: *String*
- Description: Returns the friends list based off the uuid

#### hype.getResources(resource)

- Returns: *Promise*
- Arguments: *String*
- Description: Returns the resources

#### hype.getSkyblockProfiles(uuid)

- Returns: *Promise*
- Arguments: *String*
- Description: Returns the Sky Block profiles based off the uuid

#### hype.getSkyblockBazaar()

- Returns: *Promise*
- Arguments: N/A
- Description: Returns the Sky Block bazaar products

#### hype.getProduct(productId)

- Returns: *Promise*
- Arguments: *String*
- Description: Returns the product based off ID

#### hype.getSkyblockAuction(obj)

- Returns: *Promise*
- Arguments: *Object*
- Description: Takes an object as an argument with this kind of format:

  ```js
  {
    player: "",
    profile: "",
    uuid: ""
  }
  ```

  Will throw an error if incorrectly formatted object is passed in

#### hype.getCurrentAuctions(page)

- Returns: *Promise*
- Arguments: *String*
- Description: Returns the current auction based off page

#### hype.getTopMargins()

- Returns: *Promise*
- Arguments: N/A
- Description: Returns the top 5 projects in the bazaar

#### hype.getArmor(object)

- Returns: *Promise*
- Arguments: *Object*
- Description: Takes an object as an argument with this kind of format:

  ```js
  {
    uuid: "",
    profileName: ""
  }
  ```

  Will throw an error if incorrectly formatted object is passed in
