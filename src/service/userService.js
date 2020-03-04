const UserService = {
    'fetchUserDetails': async () => {
        let res = await fetch('http://dummy.restapiexample.com/api/v1/employees');
        res = res.json();
        return res;
    }
}

export default UserService;