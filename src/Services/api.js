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
        return `Error posting data to url :${url}, Error:${error}`
    })
}

const loginPost = (url,data) =>{
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

export const registerUser = user => post(`auth/register`,user);

export const login = user => loginPost(`auth/login`, user);

export const CreateBook = (book) => post(`book/createbook`,book);

export const getBookById = id => get(`book/bookbyid/${id}`);

export const getAllBooks = (userId,tenantId) => get(`book/books/${userId}/${tenantId}`);

export const createStage = (stage,bookId) => post(`book/stage/${bookId}`,stage);

export const getAllStages = (bookId,envId) => get(`book/stages/${bookId}/${envId}`);

export const createTask = (task,bookId) => post(`book/task/${bookId}`,task);

export const getAllTasks = stageId => get(`book/tasks/${stageId}`);

export const getStatuses = () => get(`book/statuses`);

export const updateTasksStatus = (ids,statusId) => put(`book/updatetasks/${ids}/${statusId}`);

export const updateStageStatus = (stageId,nextStageId,statusId) => put(`book/updateStage/${stageId}/${nextStageId}/${statusId}`)

export const getAllEnvironments = (tenantId) => get(`/book/environments/${tenantId}`);

export const createApplication = (app,tenantId) => post(`/application/createapp/${tenantId}`,app);

export const getAllApplications = tenantId => get(`/application/applications/${tenantId}`)

export const getApplicationTypes = (tenantId) => get(`/application/applicationtypes/${tenantId}`);

export const linkApplicationsToBook = (bookId,appIds) => post(`/application/addapplications/${bookId}/${appIds}`);

export const getApplicationsByBookId = bookId => get(`/application/bookapplications/${bookId}`);

export const updateBookByEnvironment = (bookId,envId,statusId) => get(`/book/updatebook/${bookId}/${envId}/${statusId}`);

export const deleteTaskInAllEnvs = (bookId,taskName) => put(`/book/deletetask/${bookId}/${taskName}`);

export const getAllUsers = (tenantId) => get(`/user/users/${tenantId}`);

export const createGroup = (tenantId,group) => post(`/user/group/${tenantId}`,group);

export const getTenantGroups = (tenantId) => get(`/user/groups/${tenantId}`);

export const addUsersToGroups = (groupId,userIds) => post(`/user/addgroupusers/${groupId}/${userIds}`);

export const getGroupUsers = (groupId) => get(`/user/groupusers/${groupId}`);

export const getTenant = (tenantId) => get(`/user/tenant/${tenantId}`);

export const getEmail = (emailId) =>get(`/user/sendemail/${emailId}`);

export const createCustomEnvironment = (env,tenantId) => post(`/user/customenvironments/${tenantId}`,env);

export const createCustomApplicationType = (appType,tenantId) => post(`/application/createapptype/${tenantId}`,appType);

export const createCustomResourceType = (resType,tenantId) => post(`/application/createresourcetype/${tenantId}`,resType);

export const getResourceTypes = (tenantId) => get(`/application/resourcetypes/${tenantId}`);

export const createResource = (resource,tenantId) => post(`/application/createresource/${tenantId}`,resource);

export const getResources = (tenantId) => get(`/application/resources/${tenantId}`);

export const getPermissions = () => get('/user/permissions');

export const updateTask = (taskId,task) => post(`book/updatetask/${taskId}`,task);