<script setup lang="ts">
import DefaultTheme from 'vitepress/theme'
import { useData } from 'vitepress'

const { Layout } = DefaultTheme

const { frontmatter } = useData()
</script>

<template>
    <span class="date">🔥&nbsp;更新时间：{{ frontmatter.date }}</span>
</template>

<style>
  .date{
    font-size: 15px;
    color: #7f7f7f;
    margin-right: 10px;
  }
</style>