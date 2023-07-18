<script lang="ts" setup>
import { TabPane, Tabs } from 'ant-design-vue';
import { ref } from 'vue';

const panes = ref<{ title: string; content: string; key: string; closable?: boolean }[]>([
  { title: 'Tab 1', content: 'Content of Tab 1', key: '1' },
  { title: 'Tab 2', content: 'Content of Tab 2', key: '2' },
  { title: 'Tab 3', content: 'Content of Tab 3', key: '3', closable: false },
]);
const activeKey = ref(panes.value[0].key);
</script>

<template>
  <div class="vino-page-tabs">
    <Tabs v-model:activeKey="activeKey" type="card">
      <TabPane v-for="pane in panes" :key="pane.key" :tab="pane.title" :closable="pane.closable" />
    </Tabs>
  </div>
</template>

<style lang="scss">
.vino-page-tabs {
  padding-inline: 16px;
}
</style>
