function [J grad] = nnCostFunction(nn_params, ...
                                   input_layer_size, ...
                                   hidden_layer_size, ...
                                   num_labels, ...
                                   X, y, lambda)
%NNCOSTFUNCTION Implements the neural network cost function for a two layer
%neural network which performs classification
%   [J grad] = NNCOSTFUNCTON(nn_params, hidden_layer_size, num_labels, ...
%   X, y, lambda) computes the cost and gradient of the neural network. The
%   parameters for the neural network are "unrolled" into the vector
%   nn_params and need to be converted back into the weight matrices.
%
%   The returned parameter grad should be a "unrolled" vector of the
%   partial derivatives of the neural network.
%

% Reshape nn_params back into the parameters Theta1 and Theta2, the weight matrices
% for our 2 layer neural network
Theta1 = reshape(nn_params(1:hidden_layer_size * (input_layer_size + 1)), ...
                 hidden_layer_size, (input_layer_size + 1));

Theta2 = reshape(nn_params((1 + (hidden_layer_size * (input_layer_size + 1))):end), ...
                 num_labels, (hidden_layer_size + 1));

% Setup some useful variables
m = size(X, 1);

% You need to return the following variables correctly
J = 0;
Theta1_grad = zeros(size(Theta1));
Theta2_grad = zeros(size(Theta2));

% ====================== YOUR CODE HERE ======================
% Instructions: You should complete the code by working through the
%               following parts.
%
% Part 1: Feedforward the neural network and return the cost in the
%         variable J. After implementing Part 1, you can verify that your
%         cost function computation is correct by verifying the cost
%         computed in ex4.m
%           J += (1/m) * sum(-y(k) * log(a3(k)) - (1-y(k))*log(1-a3(k)) );
        theX = [ones(m, 1) X];
        a2 = sigmoid(theX * Theta1');
        a2 = [ones(m, 1)  a2];
        a3 = sigmoid(a2 * Theta2');


        [maxLikehood, indexs] = max(a3, [], 2);

        p = indexs;
        Jt = 0;

        for i = 1:m
            for k = 1: num_labels


                tt = [1:10];

                yi = (y(i) == tt);
                yi = yi'; % 无所谓？why?
                Jt += (-yi(k) * log(a3(i, k)) - (1-yi(k))*log(1-a3(i, k)) );
            endfor
        endfor
        J = Jt /m;


        %1.4 Regularized cost function

        Theta1_ = Theta1(:,2:end);
        Theta2_ = Theta2(:,2:end);
        RegularPart = 0;
        sumTheta1 = 0;
        sumTheta2 = 0;
        [mTheta1, nTheta1] = size(Theta1_);
        [mTheta2, nTheta2] = size(Theta2_)
        for j = 1:mTheta1
            for k = 1: nTheta1
                sumTheta1 += Theta1_(j, k)^2;
            endfor
        endfor
        for j = 1:mTheta2
            for k = 1: nTheta2
                sumTheta2 += Theta2_(j, k)^2;
            endfor
        endfor
        RegularPart = sumTheta1 + sumTheta2;
        RegularPart = RegularPart * (lambda/(m*2));
        J += RegularPart;

% Part 2: Implement the backpropagation algorithm to compute the gradients
%         Theta1_grad and Theta2_grad. You should return the partial derivatives of
%         the cost function with respect to Theta1 and Theta2 in Theta1_grad and
%         Theta2_grad, respectively. After implementing Part 2, you can check
%         that your implementation is correct by running checkNNGradients
%
%         Note: The vector y passed into the function is a vector of labels
%               containing values from 1..K. You need to map this vector into a
%               binary vector of 1's and 0's to be used with the neural network
%               cost function.
%
%         Hint: We recommend implementing backpropagation using a for-loop
%               over the training examples if you are implementing it for the
%               first time.
            % for every training example
            Delta1 = zeros(size(Theta1)); %25x401
            Delta2 = zeros(size(Theta2)); %10x26
            t10 = [1:10];
            for t = 1: m
                % ####### 1,
                % forward
                a_1 = theX(t, :); % 一条记录
                z2 = a_1 * Theta1';
                a_2 = sigmoid(z2);
                %sizeA2 = size(a_2) % 1* 25
                a_2 = [1  a_2];

                z3  = a_2 * Theta2';
                a_3 = sigmoid(z3);
                %sizeA3 = size(a_3)  1*10

                %####### 2
                [maxLikehood, indexs] = max(a_3, [], 2);

                yk = (t10 == y(t)); %取y(t) 例如：3 转换成[0, 0, 0, 1, ...]

                %a3k = (t10 == indexs);% 计算得到的a3 同样转换 1 * 10 vector [0.2, 0.32, 0.08, 1, ...]

                delta3 = a_3 - yk;
                %sizeDelta3 = size(delta3) 1 * 10


                %####### 3

                z2 = a_1 * Theta1';

                tmpp = delta3 * Theta2;
                %size(tmpp) %1x26

                delta2 = tmpp(2:end) .* sigmoidGradient(z2);

                %size(delta2) 1*25

                %sizeDelta3 = size(delta3) % 1* 10
                %sizeDelta2 = size(delta2) % 1 * 649

                %sizeA2 = size(a_2) % 1* 25
                %sizeA1 = size(a_1) % 1 * 401
                %####### 4
                 Delta1 = Delta1 + delta2' * a_1;
                 Delta2 = Delta2 + delta3' * a_2;

            endfor
            %####### 5
            m1 = size(Theta1,1);
            m2 = size(Theta2,1);
            Thet1 = [zeros(m1,1) Theta1(:,2:end)];
            Thet2 = [zeros(m2,1) Theta2(:,2:end)];

            Theta1_grad = Delta1/m +lambda/m*Thet1; %25x401
            Theta2_grad = Delta2/m +lambda/m*Thet2; %10x26

%
% Part 3: Implement regularization with the cost function and gradients.
%
%         Hint: You can implement this around the code for
%               backpropagation. That is, you can compute the gradients for
%               the regularization separately and then add them to Theta1_grad
%               and Theta2_grad from Part 2.
%



















% -------------------------------------------------------------

% =========================================================================

% Unroll gradients
grad = [Theta1_grad(:) ; Theta2_grad(:)];


end
