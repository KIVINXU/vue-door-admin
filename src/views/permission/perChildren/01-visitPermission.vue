<template>
  <div class="col-sm-8">
    <div class="box">
      <div class="box-header">
        <div class="inline" style="float: right">
          <router-link to="/permission/addPermission" class="btn btn-default">添加权限</router-link>
        </div>
      </div>
      <!-- /.box-header -->
      <div class="box-body">
        <table class="table table-bordered table-hover">
          <tbody><tr class="warning">
            <th>序号</th>
            <th>权限名称</th>
            <th>允许访问页面</th>
            <th>说明</th>
            <th>操作</th>
          </tr>
          <tr>
            <td>1</td>
            <td>设备管理员</td>
            <td>xxxxxx</td>
            <td>xxxxxx</td>
            <td>
              <router-link to="/permission/changePermission/1" class="btn btn-warning btn-sm">修改</router-link>
              <a href="#" class="btn btn-danger btn-sm">删除</a>
            </td>
          </tr>
          <tr>
            <td>2</td>
            <td>班主任</td>
            <td>xxxxxx</td>
            <td>xxxxxx</td>
            <td>
              <router-link to="/permission/changePermission/2" class="btn btn-warning btn-sm">修改</router-link>
              <a href="#" class="btn btn-danger btn-sm">删除</a>
            </td>
          </tr>
          </tbody></table>
      </div>
      <!-- /.box-body -->
    </div>
  </div>
</template>
