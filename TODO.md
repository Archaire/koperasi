# TODO

## Pages

### HOME
- [ ] Create navbar probably with *flexbox* layout? #UI
    - [ ] Logo?
- [ ] 

### FAQ

- pake dropdown 

### About

### Contact


### Registration/Login Form
- [ ] Auth

### Loan Form

### Dashboard (Logged in)

### Report (Logged in)


## Data

|               |                  |
|---------------|------------------|
| registered_at | TIMESTAMP        |
| name          | VARCHAR          |
| occupation    | VARCHAR          |
| gender        | CATEGORY/VARCHAR | ??
| user_num      | INT UNIQUE       |
| ktp_num       | INT UNIQUE       |
| birthdate     | DATETIME         |
| address       | TEXT             |
| telephone_num | INT/VARCHAR      | ??
| status        | VARCHAR/TEXT     | ??

```sql
CREATE TABLE user(
    id            INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    registered_at TIMESTAMP NOT NULL,
    name          VARCHAR(?) NOT NULL,
    occupation    VARCHAR(?) NOT NULL,
    gender        ??,
    user_num      INT NOT NULL UNIQUE,
    ktp_num       INT NOT NULL UNIQUE,
    birthdate     DATETIME NOT NULL,
    address       TEXT,
    telephone_num INT/VARCHAR(?),
    status        VARCHAR(?)/TEXT,
    INDEX (name,ktp_num)
)
```
# Research
- Find a better way than ejs.  Need simple not bloated and no/litte framework as possible.
# Login form


BUG:
- Member name got trim automatically ? possiblly ejs thing?
