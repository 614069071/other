<script lang="jsx">
import { compile } from "vue/dist/vue.esm-bundler";
import routers from "@/utils/routers";

/*
  由于arco的icon是通过自定义组件实现,若是使用arco内置icon则需要使用compile函数解析，
  若是使用iconfont等，可使用class类名来
*/
export default defineComponent({
  name: "menu-bar",
  setup() {
    const middle = (routers, idx = "0") =>
      routers.map((router, i) => {
        const index = `${idx}-${i}`;

        return router.children && router.children.length ? (
          <a-sub-menu key={index} v-slots={{ title: () => router.name, icon: () => h(compile(`<${router.meta.icon} />`)) }}>
            {middle(router.children, index)}
          </a-sub-menu>
        ) : (
          <a-menu-item key={index} onClick={() => window.console.log("on", router)}>
            {router.name}
          </a-menu-item>
        );
      });

    const setDefItemKey = k => {
      localStorage.setItem("__define_item_key__", k);
    };

    const __define_item_key__ = localStorage.getItem("__define_item_key__") || "";

    const setDefSelectKey = k => {
      localStorage.setItem("__define_select_key__", k);
    };

    const __define_select_key__ = localStorage.getItem("__define_select_key__") || "";

    return () => (
      <div className="menu-bar-wrapper">
        <a-menu
          accordion
          theme="dark"
          default-open-keys={[__define_item_key__]}
          default-selected-keys={[__define_select_key__]}
          onMenuItemClick={k => setDefSelectKey(k)}
          onSubMenuClick={k => setDefItemKey(k)}
        >
          {middle(routers)}
        </a-menu>
      </div>
    );
  },
});
</script>

<style scoped lang="less">
.menu-bar-wrapper {
  width: 200px;

  &:deep(.arco-menu-icon) {
    font-size: 18px;
  }
}
</style>
