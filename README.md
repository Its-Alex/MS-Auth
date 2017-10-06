# MS-Auth
Nodejs authentication microservice for mariadb
# Configuration
To configure microservice add this to a config.json file with your own data in the project folder
```json
{
    "port": 3000,
    "db": {
        "host": "",
        "database": "",
        "username": "",
        "password": ""
    },
    "passport": {
        "fortyTwo": {
            "id": "",
            "secret": ""
        },
        "github": {
            "id": "",
            "secret": ""
        },
        "facebook": {
            "id": "",
            "secret": ""
        }
    }
}
```