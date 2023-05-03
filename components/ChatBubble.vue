<script setup lang="ts">
import { Message, User } from '~/types'

/* props */
export interface Props {
  message: Message
  user: User
}

const props = defineProps<Props>()
</script>

<template>
    <div :class="['chat', props.user.id === 'user' ? 'chat-end' : 'chat-start']">
        <div class="chat-image avatar">
            <div class="w-10 rounded-full">
                <img :src="props.user.avatar" />
            </div>
        </div>
        <div class="chat-header">
            {{ props.user.name }}
            <time class="text-xs opacity-50">{{ useTimeAgo(props.message.createdAt).value }}</time>
        </div>
        <div class="chat-bubble">{{ props.message.text }}</div>
    </div>
</template>
