import { shallowMount, mount, createLocalVue } from '@vue/test-utils';
import Home from '@/views/Home.vue';
import VueRouter from 'vue-router';
import myRoutes from "./mocks/routes"

const localVue = createLocalVue()
localVue.use(VueRouter)
const router = new VueRouter(myRoutes)

describe("Home", () => {
  it("Carga la vista Home", () => {
    const wrapper = shallowMount(App, { localVue, router })
    router.push("/")
    expect(wrapper.find(Home).exists()).toBe(true)
  })
  
})


describe('Vista Home', () => {
  const wrapper = shallowMount(Home);

  test('is a Vue instance', () => {
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
})





