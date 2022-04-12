<script lang="jsx">
import { compile } from "vue/dist/vue.esm-bundler";

const routes = [
  {
    path: "dashboard",
    name: "dashboard",
    meta: { locale: "menu.dashboard", requiresAuth: true, icon: "icon-dashboard" },
    children: [
      { path: "workplace", name: "workplace", meta: { locale: "menu.dashboard.workplace", requiresAuth: true, roles: ["*"] } },
      { path: "monitor", name: "monitor", meta: { locale: "menu.dashboard.monitor", requiresAuth: true, roles: ["admin"] } },
    ],
  },
  {
    path: "visualization",
    name: "visualization",
    meta: { locale: "menu.visualization", requiresAuth: true, icon: "icon-apps" },
    children: [
      { path: "data-analysis", name: "dataAnalysis", meta: { locale: "menu.visualization.dataAnalysis", requiresAuth: true, roles: ["admin"] } },
      { path: "multi-dimension-data-analysis", name: "multiDimensionDataAnalysis", meta: { locale: "menu.visualization.multiDimensionDataAnalysis", requiresAuth: true, roles: ["admin"] } },
    ],
  },
  {
    path: "list",
    name: "list",
    meta: { locale: "menu.list", requiresAuth: true, icon: "icon-list" },
    children: [
      { path: "search-table", name: "searchTable", meta: { locale: "menu.list.searchTable", requiresAuth: true, roles: ["*"] } },
      { path: "card", name: "card", meta: { locale: "menu.list.cardList", requiresAuth: true, roles: ["*"] } },
    ],
  },
  {
    path: "form",
    name: "form",
    meta: { locale: "menu.form", icon: "icon-settings", requiresAuth: true },
    children: [
      { path: "step", name: "step", meta: { locale: "menu.form.step", requiresAuth: true, roles: ["admin"] } },
      { path: "group", name: "group", meta: { locale: "menu.form.group", requiresAuth: true, roles: ["admin"] } },
    ],
  },
  {
    path: "profile",
    name: "profile",
    meta: { locale: "menu.profile", requiresAuth: true, icon: "icon-file" },
    children: [{ path: "basic", name: "basic", meta: { locale: "menu.profile.basic", requiresAuth: true, roles: ["admin"] } }],
  },
  {
    path: "result",
    name: "result",
    meta: { locale: "menu.result", icon: "icon-check-circle", requiresAuth: true },
    children: [
      { path: "success", name: "success", meta: { locale: "menu.result.success", requiresAuth: true, roles: ["admin"] } },
      { path: "error", name: "error", meta: { locale: "menu.result.error", requiresAuth: true, roles: ["admin"] } },
    ],
  },
  {
    path: "exception",
    name: "exception",
    meta: { locale: "menu.exception", requiresAuth: true, icon: "icon-exclamation-circle" },
    children: [
      { path: "403", name: "403", meta: { locale: "menu.exception.403", requiresAuth: true, roles: ["admin"] } },
      { path: "404", name: "404", meta: { locale: "menu.exception.404", requiresAuth: true, roles: ["*"] } },
      { path: "500", name: "500", meta: { locale: "menu.exception.500", requiresAuth: true, roles: ["*"] } },
    ],
  },
  {
    path: "user",
    name: "user",
    meta: { locale: "menu.user", icon: "icon-user", requiresAuth: true },
    children: [
      { path: "info", name: "info", meta: { locale: "menu.user.info", requiresAuth: true, roles: ["*"] } },
      { path: "setting", name: "setting", meta: { locale: "menu.user.setting", requiresAuth: true, roles: ["*"] } },
    ],
  },
];

/*
  由于arco的icon是通过自定义组件实现,若是使用arco内置icon则需要使用compile函数 + svg loader解析，
  若是使用iconfont等，可使用class类名来
*/
export default defineComponent({
  name: "menu-bar",
  setup() {
    const middle = (routers,idx = '0') =>
      routers.map((router,i) =>
        router.children && router.children.length ? (
          <a-sub-menu key={`${idx}-${i}`} v-slots={{ title: () => router.name, icon: () => h(compile(`<${router.meta.icon} />`)) }}>
            {middle(router.children,`${idx}-${i}`)}
          </a-sub-menu>
        ) : (
          <a-menu-item key={r`${idx}-${i}`}>{router.name}</a-menu-item>
        )
      );

    return () => (
      <div className="menu-bar-wrapper">
        <a-menu theme="dark" accordion>
          {middle(routes)}
        </a-menu>
      </div>
    );
  },
});
</script>

<style>
.menu-bar-wrapper {
  width: 200px;
}
</style>
