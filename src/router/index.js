import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@/views/Home.vue';
import Classify from '@/views/Classify.vue';
import Shopping from '@/views/Shopping.vue';
import Search from '@/views/search.vue';

Vue.use(VueRouter);
VueRouter.prototype.back = false;
VueRouter.prototype.goback = function () {
  this.back = true;
  this.go(-1);
};
const routes = [
  {
    path: '/home',
    component: Home,
    children: [
      {
        path: 'classify',
        name: 'classify',
        component: Classify,
      },
      {
        path: 'shopping',
        component: Shopping,
      },
    ],
  },
  {
    path: '/search',
    name: 'search',
    component: Search,
  },

  {
    path: '*',
    redirect: '/home/classify',
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
