#include<bits/stdc++.h>
using namespace std;
vector<long long int> A(100);
long long fact(long long n){
    if(n == 1){
        A[1] = 1;
        return A[n];
    }
    else if(A[n] == 0) {
        A[n] = n * fact(n-1);
        return A[n];
    }
    else
        return A[n];
}
int main() {
    int n, t;
    cin >> t;
    for(int i = 0 ; i < t; i++) {
        cin >> n;
        cout<<fact(n)<<endl;
    }
}
