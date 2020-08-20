import axios from 'axios';

const logout = () =>{
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('TenantId');
    sessionStorage.clear();
    window.location.href = '/';
}

axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL;

axios.interceptors.request.use(config=>{
    var token = sessionStorage.getItem('token');
    if(token != null){
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
},
error => Promise.reject(error)
);


const get = url =>{
    return axios.get(url).then(res=>{
        if(res.status === 200){
            if(res.headers.authorization !== null && typeof(res.headers.authorization) !== 'undefined'){
                sessionStorage.setItem('token',res.headers.authorization);
            }
            return res.data;
        }
        else{
           return Promise.resolve(null);
        }
    }).catch(error=>{
        if(typeof(error.response) !== 'undefined' && error.response.status === 401){
            logout();
        }
        return Promise.reject(error)
        //return `Error getting url :${url}, Error:${error}`
    });
}

const post = (url,data) => {
    return axios.post(url,data).then(res=>{
        if(res.status === 200){
            if(res.headers.authorization !== null && typeof(res.headers.authorization) !== 'undefined'){
                sessionStorage.setItem('token',res.headers.authorization);
            }
            return res.data;
        }
        else{
            return Promise.resolve(null);
        }
    }).catch(error=>{
        if(typeof(error.response) !== 'undefined' && error.response.status === 401){
            logout();
        }
        if(error.response.status === 409){
            console.log("Duplicate in api")
            return error;
        }
        return `Error posting data to url :${url}, Error:${error}`
    })
}

const authPost = (url,data) =>{
    return axios.post(url,data);
}

const put = (url) => {
    return axios.put(url).then(res=>{
        if(res.status === 200){
            if(res.headers.authorization !== null && typeof(res.headers.authorization) !== 'undefined'){
                sessionStorage.setItem('token',res.headers.authorization);
            }
            return res.data;
        }
        else{
            return Promise.resolve(null);
        }
    }).catch(error=>{
        if(typeof(error.response) !== 'undefined' && error.response.status === 401){
            logout();
        }
        return `Error updating to URL ${url}. Error:${error}`
    });
}

const httpdelete = (url) => {
    return axios.delete(url).then(res=>{
        if(res.status === 200){
            if(res.headers.authorization !== null && typeof(res.headers.authorization) !== 'undefined'){
                sessionStorage.setItem('token',res.headers.authorization);
            }
            return res.data;
        }
        else{
            return Promise.resolve(null);
        }
    }).catch(error=>{
        if(typeof(error.response) !== 'undefined' && error.response.status === 401){
            logout();
        }
        return `Error Deleting the resource to URL ${url}. Error:${error}`
    });
}

export const registerUser = user => authPost(`auth/Register`,user);

export const login = (user) => authPost(`auth/Login`, user);

export const ForgotPasswordSendOTP = user => authPost(`auth/ForgotPasswordSendOTP`,user);

export const ResetPassword = user => authPost(`auth/ResetPassword`,user);

export const CreateBook = (book) => post(`book/CreateBook`,book);

export const getBookById = id => get(`book/GetBookById/${id}`);

export const getAllBooks = (userId,tenantId) => get(`book/GetBooks/${userId}/${tenantId}`);

export const createStage = (stage,bookId) => post(`stage/CreateStage/${bookId}`,stage);

export const getAllStages = (bookId,envId) => get(`stage/GetStages/${bookId}/${envId}`);

export const createTask = (task,bookId) => post(`task/CreateTask/${bookId}`,task);

export const getAllTasks = stageId => get(`task/GetTasks/${stageId}`);

export const getStatuses = () => get(`book/GetStatuses`);

export const updateTasksStatus = (ids,statusId) => put(`task/UpdateTasks/${ids}/${statusId}`);

export const updateStageStatus = (stageId,nextStageId,statusId) => put(`stage/UpdateStage/${stageId}/${nextStageId}/${statusId}`)

export const getAllEnvironments = (tenantId) => get(`environment/GetEnvironments/${tenantId}`);

export const createApplication = (app,tenantId) => post(`application/CreateApplication/${tenantId}`,app);

export const getAllApplications = tenantId => get(`application/GetApplications/${tenantId}`)

export const getApplicationTypes = (tenantId) => get(`application/GetApplicationTypes/${tenantId}`);

export const linkApplicationsToBook = (bookId,appIds) => post(`application/AddApplicationToBook/${bookId}/${appIds}`);

export const getApplicationsByBookId = bookId => get(`application/GetBookApplications/${bookId}`);

export const updateBookByEnvironment = (bookId,envId,statusId) => put(`book/UpdateBook/${bookId}/${envId}/${statusId}`);

export const deleteTaskInAllEnvs = (bookId,taskName) => httpdelete(`task/DeleteTask/${bookId}/${taskName}`);

export const getAllUsers = (tenantId) => get(`user/GetUsers/${tenantId}`);

// export const createGroup = (tenantId,group) => post(`group/CreateGroup/${tenantId}`,group);

// export const getTenantGroups = (tenantId) => get(`group/GetGroups/${tenantId}`);

// export const addUsersToGroups = (groupId,userIds) => post(`group/AddGroupUsers/${groupId}/${userIds}`);

// export const getGroupUsers = (groupId) => get(`group/GetGroupUsers/${groupId}`);

export const getTenant = (tenantId) => get(`user/GetTenant/${tenantId}`);

export const getEmail = (InviteUsers) => post(`user/InviteUserByEmail`,InviteUsers);

export const createCustomEnvironment = (env,tenantId) => post(`environment/CreateEnvironment/${tenantId}`,env);

export const createCustomApplicationType = (appType,tenantId) => post(`application/CreateApplicationType/${tenantId}`,appType);

export const createCustomResourceType = (resType,tenantId) => post(`resource/CreateResourceType/${tenantId}`,resType);

export const getResourceTypes = (tenantId) => get(`resource/GetResourceTypes/${tenantId}`);

export const createResource = (resource,tenantId) => post(`resource/CreateResource/${tenantId}`,resource);

export const getResources = (tenantId) => get(`resource/GetResources/${tenantId}`);

// export const getPermissions = () => get('group/GetPermissions');

export const updateTask = (taskId,task) => post(`task/UpdateTask/${taskId}`,task);

export const createTeam = (team) => post(`team/CreateTeam`,team);

export const getAllTeams = (tenantId) => get(`team/GetTeams/${tenantId}`);

export const subscribeToTask = (taskId,emailId) => put(`task/subscribeTask/${taskId}/${emailId}`);