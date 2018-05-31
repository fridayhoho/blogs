clear ; close all; clc

function [f, g] = myfun(x)

    f = sin(x) + 3;
    g = cos(x);

end


options = optimset('GradObj','on');

%myfun(99)

theta = 0;
cost = 0;
theta, cost = fminunc('myfun', 4 ,options)