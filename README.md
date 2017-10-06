# MS-Auth
Nodejs authentication microservice for mariadb
# Configuration
To configure microservice add this to a config.json file with your own data in the project folder
```json
{
    "port": number,
    "db": {
        "host": string,
        "database": string,
        "username": string,
        "password": string
    },
    "passport": {
        "fortyTwo": {
            "id": string,
            "secret": string
        },
        "github": {
            "id": string,
            "secret": string
        },
        "facebook": {
            "id": string,
            "secret": string
        }
    }
}
```