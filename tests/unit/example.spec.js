import { shallowMount } from '@vue/test-utils'
//import stave from "@/components/stave";
import store from "@/store/store"

/*describe('stave.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'new message'
    const wrapper = shallowMount(stave, {
      propsData: { msg }
    });
    expect(wrapper.text()).toMatch(msg)
  })
});*/

describe('store.js', () => {
  it("random number is within tone range", () => {
    // eslint-disable-next-line no-unused-vars
    const wrapper = shallowMount(store, {

    })
  })
});

