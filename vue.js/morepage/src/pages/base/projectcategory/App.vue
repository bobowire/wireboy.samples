<template>
  <div id="app">
    <img src="./assets/logo.png">
    <h1>projectcategory</h1>
    <!-- <router-view/> -->
    <a-spin :spinning="spinning">
    <a-table :columns="columns" :dataSource="data" :rowSelection="{}" v-on:expand=test :pagination=false bordered>
      <!-- <div slot="Effective"   slot-scope="text, record, index">
                  <a-checkbox v-if="!record.editable" :checked="record.effective"></a-checkbox>
                  <a-checkbox v-else :checked="record.effective" @change="onChange(record)"></a-checkbox>
              </div>
              <template v-for="col in ['Name', 'DataType', 'Unit']" :slot="col" slot-scope="text, record, index">
                <div :key="col">
                  <a-input
                    v-if="record.editable"
                    style="margin: -5px 0"
                    :value="text"
                    @change="e => handleChange(e.target.value, record.key, col)"
                  />
                  <template v-else>{{text}}</template>
                </div>
              </template>
              <template slot="Operate" slot-scope="text, record, index">
                <div class='editable-row-operations'>
                  <span v-if="record.editable">
                    <a @click="() => save(record.key)">Save</a>
                    <a-popconfirm title='Sure to cancel?' @confirm="() => cancel(record.key)">
                      <a>Cancel</a>
                    </a-popconfirm>
                  </span>
                  <span v-else>
                    <a @click="() => edit(record.key)">Edit</a>
                  </span>
                </div>
              </template> -->
    </a-table>
    </a-spin>
  </div>
</template>

<style>
.spin-content{
    border: 1px solid #91d5ff;
    background-color: #e6f7ff;
    padding: 30px;
  }
</style>

<script>
export default {
  name: 'App',
  data () {
    return {
      startId: 200000,
      spinning: true,
      columns: [
        {
          title: '名称',
          dataIndex: 'name',
          scopedSlots: { customRender: 'Name' }
        },
        {
          title: '数据类型',
          dataIndex: 'dataType',
          scopedSlots: { customRender: 'DataType' }
        },
        {
          title: '单位',
          dataIndex: 'unit',
          scopedSlots: { customRender: 'Unit' }
        },
        {
          title: '是否有效',
          dataIndex: 'effective',
          scopedSlots: { customRender: 'Effective' }
        },
        {
          title: '操作',
          dataIndex: 'operate',
          scopedSlots: { customRender: 'Operate' }
        }
      ],
      data: []
    }
  },
  created: function () {
    // 第一级结构
    this.$http.post('/api/GetTreeBaseData').then((response) => {
      this.data = response.body
      this.spinning = false
    })
    // 完整结构
    // this.$http.post('/api/GetTreeData').then((response) => {
    //   debugger
    //   this.data = response.body
    // })
    // this.$http.post('/api2/GetStr').then((response) => {
    //   debugger
    //   // this.data = response.body
    // })
  },

  methods: {
    test (expanded, record) {
      this.spinning = true
      if (expanded && record.children.length === 0) {
        for (var i = 0; i < 50; i++) {
          record.children.push({
            key: this.startId++,
            name: record.name + '.' + (i + 1),
            dataType: '小数',
            unit: 'm2',
            effective: true,
            remark: '备注',
            index: i
          })
        }
      }

      this.spinning = false
      debugger
      // alert('测试' + index)
    },
    onChange (record) {
      record.effective = !record.effective
      // this.checked = e.target.checked
    },
    handleChange (value, key, column) {
      const newData = [...this.data]
      const target = newData.filter(item => key === item.key)[0]
      if (target) {
        target[column] = value
        this.data = newData
      }
    },
    edit (key) {
      const newData = [...this.data]
      const target = newData.filter(item => key === item.key)[0]
      if (target) {
        target.editable = true
        this.data = newData
      }
    },
    save (key) {
      const newData = [...this.data]
      const target = newData.filter(item => key === item.key)[0]
      if (target) {
        delete target.editable
        this.data = newData
        this.cacheData = newData.map(item => ({ ...item }))
      }
    },
    cancel (key) {
      const newData = [...this.data]
      const target = newData.filter(item => key === item.key)[0]
      debugger
      if (target) {
        Object.assign(target, this.cacheData.filter(item => key === item.key)[0])
        delete target.editable
        this.data = newData
      }
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
