---
date: 2025-07-23
icon: code
---

# 强化学习

## 学习

参考教程：[西湖大学 赵世钰 - 强化学习的数学原理](https://www.bilibili.com/video/BV1sd4y167NS)

## 基础概念

- _state(状态)_：agent 在环境中的状态，RL 中最关键的一个量，需要根据实际情况自己确定。所有状态放在一起就是状态空间，$\mathcal{S}=\{s_i\}$
- _action(行动)_：agent 在每一个状态都可能有一系列可能的行为，所有可能行为构成行为空间，$\mathcal{A}(s_i)=\{a_i\}$
- _state transition(状态转换)_：当 agent 做出一个 action 后，agent 的状态会发生改变，不同的 action 有不同的 state 转换
