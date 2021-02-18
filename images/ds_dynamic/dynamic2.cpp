#include<bits/stdc++.h>
using namespace std;
int main() {
    string s1, s2;
    cin >> s1 >> s2;
    int n1 = s1.length();
    int n2 = s2.length();
    vector<vector<int>> A(n1+1, vector<int>(n2+1));
    for(int i = 1; i <= n1; i++){
        for(int j = 1; j <= n2; j++) {
            if(s1[i-1] == s2[j-1])
                A[i][j] = A[i-1][j-1] + 1;
            else
                A[i][j] = max(A[i-1][j], A[i][j-1]);
        }
    }
    cout<<"    ";
    for(int i = 0; i < n1; i++)
        cout<<s2[i]<<" ";
    cout<<endl;
    for(int i = 0; i <= n1; i++){
        if(i > 0) cout<<s1[i-1]<<" ";
        else cout<<"  ";
        for(int j = 0; j <= n2; j++)
            cout<<A[i][j] << " ";
        cout<<endl;
    }
    cout<<" longest common sub sequence is "<<A[n1][n2];
}
