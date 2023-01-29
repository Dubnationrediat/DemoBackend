let userReg = `CREATE TABLE if not exists regData(
    user_id int auto_increment,
    first_name text not null,
    user_email varchar(255) not null,
    PRIMARY KEY (user_id)
)`


export default userReg;