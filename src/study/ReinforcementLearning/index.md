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
- _state transition(状态转换)_：当 agent 做出一个 action 后，agent 的状态会发生改变，不同的 action 有不同的 state 转换，定义了 agent 和环境交互的行为。
  - 确定情况(_deterministic_)：可以直接用矩阵表达，维度是 $\mathcal{S}\times \mathcal{A}$
  - 随机情况(_stochastic_)：用条件概率表达： $p(s_2|s_1. a_1)=0.2, p(s_i|s_1,a_2)=0.8(\forall i\ne 2)$
- _policy(策略)_：告诉 agent 每个状态下要采取哪个行动。$\pi(a|s)$
  - 确定情况：$\pi (a_2|s_1) = 1, \pi (a_i|s_1) = 0(\forall i\ne 2)$ 表示在$s_1$状态下一定会采取$a_2$的行动；
  - 随机情况：$\pi (a_1|s_1) = 0.5,\pi (a_2|s_1) = 0.5, \pi (a_i|s_1) = 0(\forall i\ne 1,2)$ 表示在$s_1$状态下有对半开的概率采取 $a_1$ 或 $a_2$ 的行动；
- _reward(奖励)_：agent 采取行动后，给 agent 的一个反馈值，如果是正值则代表鼓励这种行为，如果是负数就代表惩罚这种行为，如果是 0 就代表没有惩罚（一定程度上是鼓励）。通过 reward 告诉 agent 应该怎么做，不该怎么做。**奖励取决于当前状态和行动，而不是下一步的状态。**奖励集合：$\mathcal{R}(s,a)$
  - 确定情况：用 table 表示，行表示状态，列表示行动，值表示奖励值
  - 随机情况：$p(r=-1|s_1,a_1)=0.5, p(r=1|s_1,a_1)=0.5$,表示在 $s_1$ 状态下采取 $a_1$ 状态，有 0.5 的可能性拿到-1 的奖励，也有 0.5 的可能拿到 1.
- _trajectory(轨迹)_：状态-行动-奖励链。
- _return(采样)_：沿着某条轨迹得到奖励值总和。
- _discounted rate(折合因子)_：$\gamma \in [0,1)$ 在达到目标之后，策略还在持续进行，会使得轨迹链变得无穷长，该轨迹的 return 也很大，所以要对每一步 policy 拿到的 reward 乘上一个折合因子（<1），使最后的 return 收敛。这样得到的 return 称作 discounted return.<br>
  原来的 return：$r_{1} = 0 + 0 + 0 + 1 + 1 + 1 + \cdots$ <br>
  折合的 return：$r_{discounted,1} = 0 + \gamma \times 0 + \gamma^2 \times 0 + \gamma^3 \times 1 + \gamma^4 \times 1 + \gamma^5 \times 1 + \cdots$<br>
  $=\gamma^3 (1+\gamma + \gamma^2 + \cdots) = \gamma^3 \frac{1}{1-\gamma}$
- _episode(回合)_：agent 按照策略与环境交互时，到达终点时 agent 会停止，由此产生的轨迹被称为 episode。episode 一般是有限步的。
- _Markov Decision Process(MDP，马尔科夫链)_
  - 状态集合 $\mathcal{S}=\{s_i\}$，行动集合 $\mathcal{A}(s_i)=\{a_i\}$，奖励集合$\mathcal{R}(s,a)$
  - 状态转移概率 $p(s'|s,a)$，奖励概率 $p(r|s,a)$
  - 策略 $\pi(a|s)$
  - 马尔科夫特性：状态转移概率和奖励概率均具有历史无关性。 $p(s_{t+1}|a_t,s_t,\cdots,a_0,s_0) = p(s_{t+1}|a_t,s_t)$

## 贝尔曼公式

- 强化学习里一个单步的过程 
$$ S_t \overset{A_t}{\rightarrow}R_{t+1},S_{t+1}$$
- 多步过程
$$ S_t \overset{A_t}{\rightarrow}R_{t+1},S_{t+1}\overset{A_{t+1}}{\rightarrow}R_{t+2},S_{t+2}\overset{A_{t+2}}{\rightarrow}\cdots$$
则，折合采样：
$$G_t = R_{t+1} + \gamma R_{t+2} + \gamma^2 R_{t+3} + \cdots$$
$$=R_{t+1} +\gamma(R_{t+2}+\gamma R_{t+3}+\cdots)$$
$$=R_{t+1}+\gamma G_{t+1}$$
- _state value(状态值)_：$G_t$的期望值，$v_{\pi}(s)=\mathbb{E}[G_t|S_t=s]$，不同的策略会得到不同的轨迹，也就有不同状态值。return是针对单个轨迹的reward和，state value是针对该策略下所有可能轨迹的reward和的平均值。
$$v_{\pi}(s)=\mathbb{E}[G_t|S_t=s]$$
$$=\mathbb{E}[R_{t+1}+\gamma G_{t+1}|S_t=s]$$
$$=\mathbb{E}[R_{t+1}|S_t=s]+\gamma \mathbb{E}[G_{t+1}|S_t=s]$$
其中，
$$\mathbb{E}[R_{t+1}|S_t=s]=\Sigma_a [\pi(a|s)(\Sigma_r p(r|s,a)r)]$$
$$\mathbb{E}[G_{t+1}|S_t=s]=\Sigma_{s'} [v_{\pi}(s')(\Sigma_a p(s'|s,a)\pi(a|s))]$$
- _Bellman(贝尔曼方程)_：$v_{\pi}(s)=\Sigma_a \{\pi(a|s)[(\Sigma_r p(r|s,a)r+\Sigma_{s'} v_{\pi}(s')\Sigma_a p(s'|s,a))]\}$
  - $\pi(a|s)$ 是给定的策略，某个状态下执行某个行动的可能性；
  - $p(r|s,a)$ 和 $p(s'|s,a)$ 代表动态模型，表示确定状态和行动之后，能够获得的奖励/状态转移概率，需要知道模型是否已知。<br>根据各项含义，可以继续简化式子：
  - $v_{\pi}(s)=r_{\pi}(s)+\gamma \Sigma_{s'}p_{\pi}(s'|s)v_{\pi}(s')$
    - $r_\pi(s)=\Sigma_a(\pi(a|s)\Sigma_r(p(r|s,a)r))$ 表示该策略下每一个状态可能得到的奖励的加权平均，即：即时奖励
    - $p_{\pi}(s'|s)=\Sigma_a(\pi(a|s)p(s'|s,a))$ 表示该策略下从当前状态转换到下一个状态的概率，即：状态转移概率 
  - 写成矩阵向量形式：$v_\pi = r_\pi + \gamma P_\pi v_\pi$
    - $v_\pi = [v_\pi(s_1),v_\pi(s_2),\cdots, v_\pi(s_n)]^T$
    - $r_\pi = [r_\pi(s_1),r_\pi(s_2),\cdots, r_\pi(s_n)]^T$
    - $P_\pi\in\mathbb{R}^{n\times n}, P_{\pi,i,j}=p_{\pi}(s_j|s_i)$,即状态转移概率矩阵。
- 在给定一个策略后，需要通过贝尔曼方程求解每一个状态的state value，这个过程叫作policy evaluation.由于求解贝尔曼方程需要求逆矩阵，所以为了防止奇异矩阵，在实际中一般采用迭代法求解，即：$v_{k+1}=r_\pi+\gamma P_\pi v_k$