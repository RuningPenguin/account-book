<script>
import { onHide, onLaunch, onShow } from '@dcloudio/uni-app';
import useSystem from '@/store/system';
import uniIdPageInit from '@/uni_modules/uni-id-pages/init.js';

onLaunch(() => {
  const { getSystem } = useSystem();

  getSystem();
});
onShow(() => {
  console.log('App Show');
});
onHide(() => {
  console.log('App Hide');
});
</script>
<style lang="scss">
@import 'node_modules/uview-plus/index.scss';
@import 'styles/public.scss';
</style>
