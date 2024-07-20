---
date: 2024-06-30
---

# Objects Detection

## Ground Truth, Bounding Box, Anchor Box 区分

（搬运来自知乎，但原链接已找不到）

Ground truth 是真实标注框，也就是人工标注，一般被看作“真值”

Bounding box 一般认为 (为什么是一般认为，原因参照下面一段最后括号中的内容) 是网络最终预测的结果，也就是“可能值”，因为网络可能预测正确也可能错误

Anchor box 被称作预选框/锚框，anchor 的机制会更复杂一些，有许多帖子来专门讲解这个。总的来说就是在图像上会按照一定的规律放置一些 anchor，网络会学习 anchor 相对于 ground truth 的偏移量，我们可以把 anchor 看作 bounding box 的“爷爷”，anchor+/-/x/÷ 偏移量所得到的框是 bounding box 的“父亲”，“父亲”经过非极大值抑制 (NMS) 之后就是 bounding box 了 (但是也可以说“父亲”就是 bounding box 了，只是因为“父亲”很少出现在这个领域的相关内容中，所以一般说 bounding box 的时候指的是 NMS 之后的结果)

IOU 在不同的阶段会代表不同目标之间的交并比，比如在训练阶段需要判断 anchor 是正样本还是负样本，这个时候就需要用 ground truth 和 anchor box 计算 IOU。在推理预测阶段进行 NMS 操作的时候，又要计算“父亲”每个框的 IOU 来进行合并删除操作

## YOLOv5 与 YOLOv9 区别

### 性能比较

在 COCO 数据集上，YOLOv5 的 mAP 为 50.5%，而 YOLOv9 的 mAP 为 52.7%，差别不大

### 架构层

- **YOLOv5**：采用了 CSPDarknet53 作为骨干网络，并引入了 Path Aggregation Network (PAN) 和 Feature Pyramid Network (FPN) 等模块，以增强特征提取能力。
  - Path Aggregation Network: 特征融合，通过聚合自顶向下下采样与自底向上的上采样两条路径，将高层语义特征和低层位置信息融合，包含了丰富的定位信息和不同尺度的特征信息，**增强小物体检测能力**
  - Feature Pyramid Network: 卷积网络提取特征后，通过上采样和特征融合的方式将低分辨率与高分辨率的特征融合，**得到多尺度特征图**
- **YOLOv9**：在 YOLOv5 的基础上，引入可编程的梯度信息学习策略，YOLOv9 能够更有效地进行模型参数的更新和优化，改进梯度信息的利用方式，提高模型收敛速度。
