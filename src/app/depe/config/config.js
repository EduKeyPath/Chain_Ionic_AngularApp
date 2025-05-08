import { environment } from '../../../environments/environment';

/* const liveBUrl = '';
const liveSUrl = ''; */
/* const localBUrl = 'http://localhost:4200/';
const localSUrl = 'http://localhost/chain/apps/'; */

const apiUrl = environment.apiUrl;
const version = 'ver1';

const config = {
    title : 'Chain',    
    serviceUrl : apiUrl + version + '/',
    appVer : {
        ver : version
    },
    logo : 'assets/img/logo-icon.png',
    logoAlt : 'assets/img/logo-alt-icon.png'
}

export default config;