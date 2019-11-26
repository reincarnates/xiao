const beh = require('./behavior2.js')
Component({
  behaviors: [beh],
  data: {
    a: 0,
  },
  computed: {
    b() {
      return this.data.a + 100
    },
  },
  methods: {
    onTap() {
      this.setData({
        a: ++this.data.a,
      })
    }
  }
})