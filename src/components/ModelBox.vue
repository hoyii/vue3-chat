<template>
  <div>
    <el-dropdown
      size="default"
      split-button
      type="default"
      trigger="click"
      :hide-on-click="true"
    >
      GPT 4o mini
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>Action 1</el-dropdown-item>
          <el-dropdown-item>Action 2</el-dropdown-item>
          <el-dropdown-item>Action 3</el-dropdown-item>
          <el-dropdown-item>Action 4</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
