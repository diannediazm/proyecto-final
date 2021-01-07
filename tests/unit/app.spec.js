import { shallowMount } from '@vue/test-utils'
import Home from '@/views/Home.vue';

describe('Vista Home', () => {
  const wrapper = shallowMount(Home);

  test('is a Vue instance', () => {
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
})

