#include<bits/stdc++.h>
using namespace std;
int main() {
    int n;
    cin >>n ;
    vector<pair<int,int>> A(n);
    for(int i = 0; i < n; i++) {
        cin>> A[i].first;
        A[i].second = 1;
    }
    for(int i = 0; i < n; i++)
        for(int j = 0; j <= i; j++)
            if(A[i].first > A[j].first && A[i].second < A[i].second +1)
                A[i].second = max(A[i].second, A[j].second)+1;
    for(int i = 0; i < n; i++)
        cout<<A[i].first <<" "<<A[i].second<<endl;
}
