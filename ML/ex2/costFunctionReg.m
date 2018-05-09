function [J, grad] = costFunctionReg(theta, X, y, lambda)
%COSTFUNCTIONREG Compute cost and gradient for logistic regression with regularization
%   J = COSTFUNCTIONREG(theta, X, y, lambda) computes the cost of using
%   theta as the parameter for regularized logistic regression and the
%   gradient of the cost w.r.t. to the parameters.

% Initialize some useful values
m = length(y); % number of training examples

% You need to return the following variables correctly
J = 0;
grad = zeros(size(theta));

% ====================== YOUR CODE HERE ======================
% Instructions: Compute the cost of a particular choice of theta.
%               You should set J to the cost.
%               Compute the partial derivatives and set grad to the partial
%               derivatives of the cost w.r.t. each parameter in theta

[tm ,tn] = size(theta);
[tm ,tn]
[m, n] = size(X);

J = sum( -log(sigmoid(theta' * X')) * y - log(1-sigmoid(theta' * X')) *(1-y) )/m
+ lambda/(2*m) * sum(theta(2: tm) .^ 2);



% sT = size(sigmoid(theta' * X'))  1 * 118
%sg = size(grad)  28*1
%tm tn 28 * 1
%(sigmoid(theta' * X') - y') * X  1 * 28

%sumBefore = (sigmoid(theta(:, 1)' * X') - y') * X(:, 1)
%sumBefore = (sigmoid(theta(1,1) * X(:, 1)') - y') * X(:, 1)


% X -> X(:, 1)  when j = 0
grad(1, 1) = sum( (sigmoid(theta(1,1) * X(:, 1)') - y') * X(:, 1) ) /m;

grad(2: tm) = sum( (sigmoid(theta([2:tm],:)' * X(:,[2: n])') - y') * X(:,[2: n]) ) /m + (lambda/m) * theta([2: tm],:);
% =============================================================

end
