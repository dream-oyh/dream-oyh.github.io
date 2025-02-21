---
Date: 2025-02-21
tag: 科研
---

# 科研想法记录

## ROV 六自由度动力学模型的参数辨识

- 最小二乘法

From Gemini

Okay, incorporating `C(v)v` is crucial for a more accurate model, especially if your BlueROV operates at significant velocities or undergoes rotations. Let's derive the component form of the least squares problem, including the Coriolis and centripetal terms.

**1. Recall the Coriolis and Centripetal Matrix C(v)**

From the paper you linked (and standard marine vehicle dynamics literature), the Coriolis and centripetal matrix `C(v)` for a 6-DOF underwater vehicle is typically structured as follows. It's derived from the derivative of the added mass term and the rigid body inertia term. For simplicity and focusing on identifying the _added mass_ and _linear damping_ coefficients, we often consider the Coriolis and centripetal forces primarily arising from the _added mass_ part of the inertia. Let's denote the added mass matrix as `Ma = -diag([X_udot, Y_vdot, Z_wdot, K_pdot, M_qdot, N_rdot])`.

A simplified form of `C(v)` related to added mass (often sufficient for parameter identification, especially for slower speeds) is given by:

```
C(v) = [
  0,      0,      0,      0,     -w(m-Z_wdot)+v(m-Y_vdot),  v(m-Y_vdot)+w(m-Z_wdot);
  0,      0,      0,      w(m-Z_wdot)-u(m-X_udot),  0,     -u(m-X_udot)+r(Jz-Nrdot);
  0,      0,      0,     -v(m-Y_vdot)+u(m-X_udot),  u(m-X_udot)-w(m-Z_wdot), 0;
  0,      w(m-Z_wdot)-u(m-X_udot), -v(m-Y_vdot)+u(m-X_udot), 0,      -r(Jy-Mrdot)+q(Jz-Nrdot), q(Jy-Mrdot)+r(Jz-Nrdot);
  -w(m-Z_wdot)+v(m-Y_vdot), 0,      u(m-X_udot)-w(m-Z_wdot), r(Jx-Krdot)-p(Jz-Nrdot), 0,     -p(Jx-Krdot)+r(Jz-Nrdot);
  v(m-Y_vdot)+w(m-Z_wdot), -u(m-X_udot)+r(Jz-Nrdot), 0,      -q(Jx-Krdot)+p(Jy-Mrdot), p(Jx-Krdot)-q(Jy-Mrdot), 0
]
```

**Important Note:** This form of `C(v)` is a simplification and assumes certain symmetry and negligible off-diagonal added mass terms. For a more general `C(v)`, especially if you consider off-diagonal added mass components, the expression becomes more complex. For the purpose of identifying the diagonal added mass and linear damping, this simplified `C(v)` is often a good starting point.

**2. Dynamic Equation with C(v): Ma + C(v)v + Dv = τ**

We have:

- `M = diag([m - X_udot, m - Y_vdot, m - Z_wdot, J_x - K_pdot, J_y - M_qdot, J_z - N_rdot])`
- `D = -diag([X_u, Y_v, Z_w, K_p, M_q, N_r])`
- `v = [u, v, w, p, q, r]^T`
- `a = [udot, vdot, wdot, pdot, qdot, rdot]^T`
- `τ = [X, Y, Z, K, M, N]^T`

Let's expand the equation for each degree of freedom:

**3. Component Form Expansion**

- **Surge (X-direction):**
  `(m - X_udot) * udot + (0*u + 0*v + 0*w + 0*p - w(m-Z_wdot)*q + v(m-Y_vdot)*r) - X_u * u = X`

  Simplifies to:
  `(m - X_udot) * udot + (-w(m-Z_wdot) + v(m-Y_vdot)) * q + (v(m-Y_vdot) + w(m-Z_wdot)) * r - X_u * u = X`

  Rearranging for regression:
  `X = udot * X_udot + (-u) * X_u + q*w * Z_wdot - q*v * Y_vdot - r*v * Y_vdot - r*w * Z_wdot + m*udot + (v*r - w*q)*m`

- **Sway (Y-direction):**
  `(m - Y_vdot) * vdot + (0*u + 0*v + 0*w + w(m-Z_wdot)*p + 0*q - u(m-X_udot)*r) - Y_v * v = Y`

  Simplifies to:
  `(m - Y_vdot) * vdot + (w(m-Z_wdot) - u(m-X_udot)) * p + (-u(m-X_udot) + r(Jz-Nrdot)) * r - Y_v * v = Y`

  Rearranging for regression:
  `Y = vdot * Y_vdot + (-v) * Y_v - p*w * Z_wdot + p*u * X_udot + r*u * X_udot - r*r * N_rdot + m*vdot + (w*p - u*r)*m + r^2 * J_z`

- **Heave (Z-direction):**
  `(m - Z_wdot) * wdot + (0*u + 0*v + 0*w - v(m-Y_vdot)*p + u(m-X_udot)*q + 0*r) - Z_w * w = Z`

  Simplifies to:
  `(m - Z_wdot) * wdot + (-v(m-Y_vdot) + u(m-X_udot)) * p + (u(m-X_udot) - w(m-Z_wdot)) * q - Z_w * w = Z`

  Rearranging for regression:
  `Z = wdot * Z_wdot + (-w) * Z_w + p*v * Y_vdot - p*u * X_udot - q*u * X_udot + q*w * Z_wdot + m*wdot + (u*q - v*p)*m`

- **Roll (K-direction):**
  `(J_x - K_pdot) * pdot + (0*u + w(m-Z_wdot)*v - v(m-Y_vdot)*w + 0*p - r(J_y-M_qdot)*q + q(J_z-N_rdot)*r) - K_p * p = K`

  Simplifies to:
  `(J_x - K_pdot) * pdot + (w(m-Z_wdot) - v(m-Y_vdot)) * v + (-r(J_y-M_qdot) + q(J_z-N_rdot)) * q + (q(J_z-N_rdot) + r(J_y-M_qdot)) * r - K_p * p = K`

  Rearranging for regression:
  `K = pdot * K_pdot + (-p) * K_p - v*w * Z_wdot + v*w * Y_vdot + q*r * M_qdot - q*r * N_rdot + J_x * pdot + (v*w*(m) + (q*r)*(J_z - J_y))`

- **Pitch (M-direction):**
  `(J_y - M_qdot) * qdot + (-w(m-Z_wdot)*u + 0*v + u(m-X_udot)*w + r(J_x-K_pdot)*p + 0*q - p(J_z-N_rdot)*r) - M_q * q = M`

  Simplifies to:
  `(J_y - M_qdot) * qdot + (-w(m-Z_wdot) + u(m-X_udot)) * u + (r(J_x-K_pdot) - p(J_z-N_rdot)) * p + (-p(J_z-N_rdot) + r(J_x-K_pdot)) * r - M_q * q = M`

  Rearranging for regression:
  `M = qdot * M_qdot + (-q) * M_q + u*w * Z_wdot - u*w * X_udot - r*p * K_pdot + r*p * N_rdot + J_y * qdot + (-u*w*(m) + (r*p)*(J_x - J_z))`

- **Yaw (N-direction):**
  `(J_z - N_rdot) * rdot + (v(m-Y_vdot)*u - u(m-X_udot)*v + 0*w - q(J_x-K_pdot)*p + p(J_y-M_qdot)*q + 0*r) - N_r * r = N`

  Simplifies to:
  `(J_z - N_rdot) * rdot + (v(m-Y_vdot) - u(m-X_udot)) * u + (-q(J_x-K_pdot) + p(J_y-M_qdot)) * p + (p(J_y-M_qdot) - q(J_x-K_pdot)) * q - N_r * r = N`

  Rearranging for regression:
  `N = rdot * N_rdot + (-r) * N_r - u*v * Y_vdot + u*v * X_udot + q*p * K_pdot - q*p * M_qdot + J_z * rdot + (u*v*(m) + (p*q)*(J_y - J_x))`

**4. Rearranging for Least Squares Regression (Yθ = Z') - Revisited**

Now, for each equation, we rearrange to isolate the terms with unknown parameters on the right side and put the measured forces/torques and known terms (including terms calculated from known rigid body parameters and measured velocities/accelerations) on the left side.

- **Surge (X):**
  `X - m*udot - (v*r - w*q)*m =  udot * X_udot + (-u) * X_u + (w*q - v*r) * Y_vdot + (v*r - w*q) * Z_wdot`

- **Sway (Y):**
  `Y - m*vdot - (w*p - u*r)*m - r^2 * J_z =  vdot * Y_vdot + (-v) * Y_v + (u*r - w*p) * X_udot + (w*p - u*r) * Z_wdot + (-r^2) * N_rdot`

- **Heave (Z):**
  `Z - m*wdot - (u*q - v*p)*m =  wdot * Z_wdot + (-w) * Z_w + (v*p - u*q) * X_udot + (u*q - v*p) * Y_vdot`

- **Roll (K):**
  `K - J_x * pdot - (v*w*(m) + (q*r)*(J_z - J_y)) = pdot * K_pdot + (-p) * K_p + (-v*w) * Y_vdot + (v*w) * Z_wdot + (q*r) * M_qdot + (-q*r) * N_rdot`

- **Pitch (M):**
  `M - J_y * qdot - (-u*w*(m) + (r*p)*(J_x - J_z)) = qdot * M_qdot + (-q) * M_q + (-u*w) * X_udot + (u*w) * Z_wdot + (-r*p) * K_pdot + (r*p) * N_rdot`

- **Yaw (N):**
  `N - J_z * rdot - (u*v*(m) + (p*q)*(J_y - J_x)) = rdot * N_rdot + (-r) * N_r + (u*v) * X_udot + (-u*v) * Y_vdot + (q*p) * K_pdot + (-q*p) * M_qdot`

**5. Constructing Y, θ, and Z' Matrices for Least Squares**

**Parameter Vector (θ):** Same as before:

```
θ = [X_udot, Y_vdot, Z_wdot, K_pdot, M_qdot, N_rdot, X_u, Y_v, Z_w, K_p, M_q, N_r]^T
```

**Measurement Vector (Z'):** For each time instant `i`, we have a measurement vector `Z'_i`:

```
Z'_i = [
  X_i - m*udot_i - (v_i*r_i - w_i*q_i)*m,
  Y_i - m*vdot_i - (w_i*p_i - u_i*r_i)*m - r_i^2 * J_z,
  Z_i - m*wdot_i - (u_i*q_i - v_i*p_i)*m,
  K_i - J_x * pdot_i - (v_i*w_i*(m) + (q_i*r_i)*(J_z - J_y)),
  M_i - J_y * qdot_i - (-u_i*w_i*(m) + (r_i*p_i)*(J_x - J_z)),
  N_i - J_z * rdot_i - (u_i*v_i*(m) + (p_i*q_i)*(J_y - J_x))
]^T
```

**Regression Matrix (Y):** For each time instant `i`, we construct a matrix `Y_i` (6x12):

```
Y_i = [
  udot_i,   0,        0,        0,        0,        0,       -u_i,     0,        0,        0,        0,        0;  // Surge
  0,        vdot_i,   0,        0,        0,        0,       0,        -v_i,     0,        0,        0,        0;  // Sway
  0,        0,        wdot_i,   0,        0,        0,       0,        0,        -w_i,     0,        0,        0;  // Heave
  0,        0,        0,        pdot_i,   0,        0,       0,        0,        0,        -p_i,     0,        0;  // Roll
  0,        0,        0,        0,        qdot_i,   0,       0,        0,        0,        0,        -q_i,     0;  // Pitch
  0,        0,        0,        0,        0,        rdot_i,   0,        0,        0,        0,        0,        -r_i   // Yaw
]
```

**Wait!** I made a mistake in constructing Y matrix. The Coriolis terms also involve the unknown parameters (added mass terms). I need to re-examine the rearranged equations and correct the Y matrix.

**Corrected Regression Matrix (Y) - Incorporating Coriolis Terms**

Let's re-examine the _rearranged_ equations and correctly identify the coefficients for each unknown parameter in θ.

- **Surge (X):**
  `X - m*udot - (v*r - w*q)*m =  udot * X_udot + (-u) * X_u + (v*r - w*q) * Y_vdot + (-w*q + v*r) * Z_wdot`
  Row 1 of Y_i: `[udot_i,  (v_i*r_i - w_i*q_i),  (-w_i*q_i + v_i*r_i),  0,  0,  0,  -u_i,  0,  0,  0,  0,  0]`

- **Sway (Y):**
  `Y - m*vdot - (w*p - u*r)*m - r^2 * J_z =  vdot * Y_vdot + (-v) * Y_v + (-w*p + u*r) * X_udot + (w*p - u*r) * Z_wdot + (-r^2) * N_rdot`
  Row 2 of Y_i: `[(-w_i*p_i + u_i*r_i),  vdot_i,  (w_i*p_i - u_i*r_i),  0,  0,  (-r_i^2),  0,  -v_i,  0,  0,  0,  0]`

- **Heave (Z):**
  `Z - m*wdot - (u*q - v*p)*m =  wdot * Z_wdot + (-w) * Z_w + (-u*q + v*p) * X_udot + (u*q - v*p) * Y_vdot`
  Row 3 of Y_i: `[(-u_i*q_i + v_i*p_i),  (u_i*q_i - v_i*p_i),  wdot_i,  0,  0,  0,  0,  0,  -w_i,  0,  0,  0]`

- **Roll (K):**
  `K - J_x * pdot - (v*w*(m) + (q*r)*(J_z - J_y)) = pdot * K_pdot + (-p) * K_p + (-v*w) * Y_vdot + (v*w) * Z_wdot + (q*r) * M_qdot + (-q*r) * N_rdot`
  Row 4 of Y_i: `[0,  (-v_i*w_i),  (v_i*w_i),  pdot_i,  (q_i*r_i),  (-q_i*r_i),  0,  0,  0,  -p_i,  0,  0]`

- **Pitch (M):**
  `M - J_y * qdot - (-u*w*(m) + (r*p)*(J_x - J_z)) = qdot * M_qdot + (-q) * M_q + (-u*w) * X_udot + (u*w) * Z_wdot + (-r*p) * K_pdot + (r*p) * N_rdot`
  Row 5 of Y_i: `[(-u_i*w_i),  0,  (u_i*w_i),  (-r_i*p_i),  qdot_i,  (r_i*p_i),  0,  0,  0,  0,  -q_i,  0]`

- **Yaw (N):**
  `N - J_z * rdot - (u*v*(m) + (p*q)*(J_y - J_x)) = rdot * N_rdot + (-r) * N_r + (u*v) * X_udot + (-u*v) * Y_vdot + (q*p) * K_pdot + (-q*p) * M_qdot`
  Row 6 of Y_i: `[(u_i*v_i),  (-u_i*v_i),  0,  (q_i*p_i),  (-q_i*p_i),  rdot_i,  0,  0,  0,  0,  0,  -r_i]`

**Constructing the Y Matrix and Z' Vector:**

For each time step `i = 1 to N`, construct the `Y_i` matrix (6x12) using the rows defined above, and calculate the `Z'_i` vector as defined earlier. Then stack them to form the overall `Y` (6N x 12) and `Z'` (6N x 1).

**6. Least Squares Solution:**

Solve for θ using: `θ = (Y^T * Y)^-1 * Y^T * Z'`.

**Summary of Changes and Important Notes:**

- **Coriolis Terms Included:** We have now explicitly incorporated the Coriolis and centripetal terms (derived from the simplified `C(v)` matrix) into the regression. This makes the regression matrix `Y` more complex and velocity-dependent.
- **More Complex Regression Matrix Y:** The rows of the `Y_i` matrix now contain velocity and angular velocity terms, in addition to accelerations and velocities. This reflects the non-linear influence of Coriolis and centripetal forces.
- **Data Requirements:** Accurate identification with `C(v)` requires even richer and more accurate data. You need good measurements of velocities, angular velocities, accelerations, and applied forces/torques. Noise in velocity and acceleration measurements will be amplified in the Coriolis terms, so data quality is paramount.
- **Model Validity:** Remember, we are still using a simplified `C(v)` and assuming diagonal added mass and linear damping. The accuracy of the identified parameters will depend on how well these assumptions hold for your BlueROV and its operating conditions.

This detailed derivation should provide you with a more accurate least squares formulation for identifying the added mass and linear damping parameters of your BlueROV, considering the Coriolis and centripetal effects. Good luck with your implementation!
