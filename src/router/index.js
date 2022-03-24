import App from "../App"
import NotFound from "../pages/NotFound"
import Person from "../pages/Person"
import SystemConfig from "../pages/SystemConfig"
import ServerConnection from '../pages/ServerConnection'
import DataImport from "../pages/DataImport"
import ExportData from "../pages/ExportData"
import Community from "../pages/Community"
export const secroutes = [

    {
        path: "/person",
        component: Person
    },
    {
        path: "/systemconfig",
        component: SystemConfig
    },

    {
        path: "/serverconnection",
        component: ServerConnection
    },
    {
        path: "/exportdata",
        component: ExportData
    },
    {
        path: "/dataimport",
        component: DataImport
    },
    {
        path: "/community",
        component: Community
    }
]
