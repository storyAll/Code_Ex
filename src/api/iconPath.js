const BASE_PATH='@/assets/images/icons/tools'
const BIM_BASE=BASE_PATH+'/bim'
const GIS_BATH=BASE_PATH+'/gis'
const BIM_PATH=[
  {
    normal: BIM_BASE+'/icon_bimmainview.png',
    hover: BIM_BASE+'/icon_bimmainview_hover.png'
  },
  {
    normal: BIM_BASE+'/icon_manyou.png',
    hover: BIM_BASE+'/icon_manyou_hover.png'
  },
  {
    normal: BIM_BASE+'/icon_paoqie.png',
    hover: BIM_BASE+'/icon_paoqie_hover.png'
  }
]
const GIS_PATH=[
  {
    hover: GIS_BATH+'/icon_big_hover.png',
    normal: GIS_BATH+'/icon_big_normal.png',
    press: GIS_BATH+'/icon_big_press.png'
  },
  {
    hover: GIS_BATH+'/icon_celiang_hover.png',
    normal: GIS_BATH+'/icon_celiang_normal.png',
    press: GIS_BATH+'/icon_celiang_press.png'
  },
  {
    hover: GIS_BATH+'/icon_gismainview_hover.png',
    normal: GIS_BATH+'/icon_gismainview_normal.png',
    press: GIS_BATH+'/icon_gismainview_press.png'
  },
  {
    hover: GIS_BATH+'/icon_small_hover.png',
    normal: GIS_BATH+'/icon_small_normal.png',
    press: GIS_BATH+'/icon_small_press.png'
  }
]
const PATH={
  bimPath: BIM_PATH,
  gisPath: GIS_PATH

}
export default PATH
