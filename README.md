# Bursa Company Announcements

A tool to help me read Bursa company announcements. Features:
1. Pulls data from the Bursa company announcements API
2. Filters out announcements I don't want to see
3. Highlights announcements from specific companies

---
## Author

[Adino Chang](https://github.com/adinochang)

## Requirements

Node.js and npm must be installed in the dev or production environment.

## Install

    $ git clone https://github.com/adinochang/bursa_announcements_nodejs.git
    $ cd bursa_announcements_nodejs
    $ npm install

## Configure app

Configuration is found in the `.env` file 

| Name             | Description                       |
|------------------|-----------------------------------|
| SOURCE_URL       | Bursa API URL                     |
| SOURCE_API       | API version                       |
| SOURCE_END_POINT | Endpoint for Announcements search |

## Running the project

    $ npm start dd/mm/yyyy
