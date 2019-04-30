<template>
  <div id="app" style="width:100%" >
    <h1>特征属性</h1>
    <!-- <router-view/> -->
    <div id="components-layout-demo-basic">
      <a-layout>
        <a-layout-sider>Sider</a-layout-sider>
        <a-layout>
          <a-layout-header>工具栏</a-layout-header>
          <a-layout-content>
            <a-table :rowSelection="{}" :columns="columns" :dataSource="data" bordered>
              <div slot="Effective"   slot-scope="text, record, index">
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
              </template>
            </a-table>
          </a-layout-content>
        </a-layout>
      </a-layout>
    </div>
  </div>
</template>

<style>
#components-layout-demo-basic {
  text-align: center;
}
#components-layout-demo-basic .ant-layout-header,
#components-layout-demo-basic .ant-layout-footer {
  background: #7dbcea;
  color: #fff;
}
#components-layout-demo-basic .ant-layout-footer {
  line-height: 1.5;
}
#components-layout-demo-basic .ant-layout-sider {
  background: #3ba0e9;
  color: #fff;
  line-height: 120px;
}
#components-layout-demo-basic .ant-layout-content {
  background: #fff;
  color: #fff;
  min-height: 420px;
  line-height: 420px;
}
#components-layout-demo-basic > .ant-layout {
  margin-bottom: 48px;
}
#components-layout-demo-basic > .ant-layout:last-child {
  margin: 0;
}
</style>

<script>
export default {
  name: 'App',
  created: function () {
    this.$http.post('/api/GetFeatureAttribute').then((response) => {
      debugger
      this.data = response.body
    })
    this.cacheData = this.data.map(item => ({ ...item }))
  },
  data () {
    return {
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
  methods: {
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
