export default class UserDto {
    constructor(user) {
        this.name = `${user.first_name} ${user.last_name}`;
    }
}