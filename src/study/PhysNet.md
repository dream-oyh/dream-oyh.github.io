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

选择**负皮尔逊相关系数**作为损失函数

### Ground Truth

选择 **PPG 信号**作为真实值

::: tip PPG 信号与 ECG（心电图）信号相比较
因为从手腕上采集的 PPG 信号与我们恢复的 rPPG 信号更相似，ECG 信号包含了肌电的活动，这在 rPPG 上是恢复不出来的，所以采用 PPG 做标定
:::
