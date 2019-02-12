// import HelloWorld from '@/components/HelloWorld'

// 左侧页面组件
import PageIndex from '@/pages/PageIndex.vue'
import DeviceManager from '@/pages/DeviceManager.vue'
import ContractManager from '@/pages/ContractManager.vue'
import WorkOrderManager from '@/pages/WorkOrderManager.vue'
import BackendManager from '@/pages/BackendManager.vue'

// 设备管理三级路由
import DeviceList from '@/pages/DeviceManager/DeviceList.vue'
import ShowEquipmentBIM from '@/pages/DeviceManager/ShowEquipmentBIM.vue' // 查看设备BIM
import ShowEquipmentGIS from '@/pages/DeviceManager/ShowEquipmentGIS.vue' // 查看设备GIS
import ShowPipeline from '@/pages/DeviceManager/ShowPipeline.vue' // 查看管路
import ShowPipe from '@/pages/DeviceManager/ShowPipe.vue' // 查看管井
import ShowWorkshopBIM from '@/pages/DeviceManager/ShowWorkshopBIM.vue' // 查看工厂BIM
import ShowWorkshopGIS from '@/pages/DeviceManager/ShowWorkshopGIS.vue' // 查看工厂GIS
import ShowMonitor from '@/pages/DeviceManager/ShowMonitor.vue' //查看设备监控
import ShowDeviceList from '@/pages/DeviceManager/ShowDeviceList.vue' //查看设备列表

//合同三级路由
import ContractListStic from '@/pages/ContractManager/ContractListStic.vue' // 合同首页
import ContractPipe from '@/pages/ContractManager/ContractPipe.vue' // 合同管井
import ContractPipeline from '@/pages/ContractManager/ContractPipeline.vue' // 合同管路
import ContractPipepart from '@/pages/ContractManager/ContractPipepart.vue' // 合同管段
import ShowContractList from '@/pages/ContractManager/ShowContractList.vue' // 查看合同列表
import ContractAttachmentGIS from '@/pages/ContractManager/ContractAttachmentGIS.vue' // 合同详情GIS
import ContractAttachmentBIM from '@/pages/ContractManager/ContractAttachmentBIM.vue' // 合同详情BIM
import ContractAttachmentNetworkGIS from '@/pages/ContractManager/ContractAttachmentNetworkBIM.vue' // 合同详情管网GIS
//工单三级路由
import WorkOrderListStic from '@/pages/WorkOrderManager/WorkOrderListStic.vue'
import ShowMaintenanceBIM from '@/pages/WorkOrderManager/ShowMaintenanceBIM.vue'
import MaintenanceRecordList from '@/pages/WorkOrderManager/MaintenanceRecordList.vue'

export default [
  {
    path: '/',
    name: 'PageIndex',
    component: PageIndex,
    redirect: '/DeviceManager',
    children: [
      {
        path: '/DeviceManager', // 设备管理
        name: 'DeviceManager',
        component: DeviceManager,
        redirect: '/DeviceManager/DeviceList',
        children: [
          {
            path: 'DeviceList',
            name: 'DeviceList',
            component: DeviceList
          },
          {
            path: 'ShowEquipmentBIM',
            name: '查看设备BIM',
            component: ShowEquipmentBIM
          },
          {
            path: 'ShowEquipmentGIS',
            name: '查看设备GIS',
            component: ShowEquipmentGIS
          },
          {
            path: 'ShowPipeline',
            name: '查看管路',
            component: ShowPipeline
          },
          {
            path: 'ShowPipe',
            name: '查看管井',
            component: ShowPipe
          },
          {
            path: 'ShowWorkshopBIM',
            name: '查看厂房BIM',
            component: ShowWorkshopBIM
          },
          {
            path: 'ShowWorkshopGIS',
            name: '查看厂房GIS',
            component: ShowWorkshopGIS
          },
          {
            path: 'ShowMonitor',
            name: '查看设备监控',
            component: ShowMonitor
          },
          {
            path: 'ShowDeviceList',
            name: '设备列表',
            component: ShowDeviceList
          }
        ]
      },
      {
        path: '/ContractManager', // 合同管理
        name: 'ContractManager',
        component: ContractManager,
        redirect: '/ContractManager/ContractListStic',
        children: [
          {
            path: 'ContractListStic',
            name: '合同统计',
            component: ContractListStic
          },
          {
            path: 'ContractPipeline',
            name: '合同管路',
            component: ContractPipeline
          },
          {
            path: 'ContractPipepart',
            name: '合同管段',
            component: ContractPipepart
          },
          {
            path: 'ContractPipe',
            name: '合同管井',
            component: ContractPipe
          },
          {
            path: 'ShowContractList',
            name: '合同列表',
            component: ShowContractList
          },
          {
            path: 'ContractAttachmentGIS',
            name: '合同详情GIS',
            component: ContractAttachmentGIS
          },
          {
            path: 'ContractAttachmentBIM',
            name: '合同详情BIM',
            component: ContractAttachmentBIM
          },
          {
            path: 'ContractAttachmentNetworkGIS',
            name: '合同详情管网GIS',
            component: ContractAttachmentNetworkGIS
          }
        ]
      },
      {
        path: '/WorkOrderManager', // 工单管理
        name: 'WorkOrderManager',
        component: WorkOrderManager,
        redirect: '/WorkOrderManager/WorkOrderListStic',
        children: [
          {
            path: 'WorkOrderListStic',
            name: '查看工单',
            component: WorkOrderListStic
          },
          {
            path: 'ShowMaintenanceBIM',
            name: '维保记录BIM',
            component: ShowMaintenanceBIM
          },
          {
            path: 'MaintenanceRecordList',
            name: '维保记录列表',
            component: MaintenanceRecordList
          }
        ]
      },
      {
        path: '/BackendManager', // 后台设置
        name: '后台设置',
        component: BackendManager
      }
    ]
  },
  {
    path: '*',
    redirect: '/DeviceList'
  }
]
