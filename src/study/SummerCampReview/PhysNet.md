---
date: 2024-06-29
---

# rPPG: PhysNet Review

## Conventional Model Drawbacks

1. Only one simple output - HR, which limits usage in demanding medical applications.
2. end-to-end neural networks lost the pre-processing and post-processing steps.
3. Without considering temporal context features.
4. Need pure empirical knowledge and handcrafted processing, which may cause crucial features lost.

## PhysNet Advantages

1. Considering the temporal context
2. Multiple spatio-temporal neural networks are compared
3. Not only predict HR, but also output Heart Rate Variability(HRV), efficient for medical application.
4. Generalized well.

## How does it works?

```flow
s=>start: Facial Video
result=>inputoutput: rPPG Signals
en=>end: End
step1=>operation: [step1]
把视频流投影到
表征能力更好的
色彩子空间
step2=>operation: [step2]
色彩子空间复投影
滤除噪声，实现目
标信号空间
output1=>inputoutput: [output]
多通道流形
（视频流的时
空特征图）
step3=>operation: [step3]
1x1卷积核将多
通道流形转化为
估计的rPPG时间
序列

s(right)->step1(right)->step2(right)->output1(right)->step3(right)->result(right)->en
```

其中，`[step1]`和`[step2]`采用 3DCNN 网络来实现，相较于传统方法考虑到了时间上下文特征。

![PhysNet 3DCNN Sturcture](/images/Study/PhysNet_structure.png)

## Loss Function and Ground Truth

### Loss Function

$$Loss=1-\frac{T\Sigma_1^Txy-\Sigma^T_1x\Sigma_1^Ty}{\sqrt{(T\Sigma_1^Tx^2-(\Sigma_1^Tx)^2)(T\Sigma_1^Ty^2-(\Sigma_1^Ty)^2)}}$$

其中，$T$是信号长度，$x$为预测的 rPPG 信号，$y$为真实的 PPG 信号。

该损失函数是 1 减去负皮尔逊相关系数，Loss 越小说明 rPPG 与 Ground Truth 越相关，确保二者的**趋势相似性（Trend-similarity）和最小化峰值位置误差（minimize-peak-location-errors）**

### Ground Truth

选择 **PPG 信号**作为真实值

::: tip PPG 信号与 ECG（心电图）信号相比较
因为从手腕上采集的 PPG 信号与我们恢复的 rPPG 信号更相似，ECG 信号包含了肌电的活动，这在 rPPG 上是恢复不出来的，所以采用 PPG 做标定
:::
