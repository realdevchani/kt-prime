import React, { useState, useEffect } from 'react';
import S from './style';

const ADMIN_PASSWORD = 'ktprime2025';

const STATUS_LABELS = {
  '접수완료': { label: '접수완료', color: '#1187CF' },
  '서류검토중': { label: '서류검토중', color: '#f57c00' },
  '면접대기': { label: '면접대기', color: '#7b1fa2' },
  '합격': { label: '합격', color: '#2e7d32' },
  '불합격': { label: '불합격', color: '#c62828' },
};

const Admin = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const [tab, setTab] = useState('applications'); // applications | history
  const [applications, setApplications] = useState([]);
  const [selectedApp, setSelectedApp] = useState(null);
  const [loading, setLoading] = useState(false);

  const [historyTexts, setHistoryTexts] = useState([
    "2023년 6월 브니엘 설립 및 신사역점 오픈",
    "2024년 6월  K-Start 2기 대상점 선정",
    "2025년 2월  2000 가입자 달성",
    "2025년 5월  사업자명 변경 프라임 KT 대리점 개설",
    "2025년 7월  KT프라임 잠실점 2호점 오픈",
    "2025년 12월  KT프라임 양재점 3호점 오픈",
    "2025년 12월  강남지사 우수대리점 시상"
  ]);
  const [newHistoryText, setNewHistoryText] = useState('');
  const [historySaved, setHistorySaved] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsLoggedIn(true);
      setLoginError('');
    } else {
      setLoginError('비밀번호가 올바르지 않습니다.');
    }
  };

  const fetchApplications = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:10000/api/recruiting');
      const data = await response.json();
      setApplications(data);
    } catch (err) {
      console.error('지원서 목록 조회 실패:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isLoggedIn && tab === 'applications') {
      fetchApplications();
    }
  }, [isLoggedIn, tab]);

  const handleStatusUpdate = async (id, status) => {
    try {
      const response = await fetch(
        `http://localhost:10000/api/recruiting/${id}/status?status=${encodeURIComponent(status)}`,
        { method: 'PATCH' }
      );
      if (response.ok) {
        await fetchApplications();
        if (selectedApp?.id === id) {
          setSelectedApp(prev => ({ ...prev, status }));
        }
      }
    } catch (err) {
      alert('상태 변경에 실패했습니다.');
    }
  };

  const handleAddHistory = () => {
    if (!newHistoryText.trim()) return;
    setHistoryTexts(prev => [...prev, newHistoryText.trim()]);
    setNewHistoryText('');
    setHistorySaved(false);
  };

  const handleRemoveHistory = (index) => {
    setHistoryTexts(prev => prev.filter((_, i) => i !== index));
    setHistorySaved(false);
  };

  const handleHistoryReorder = (index, direction) => {
    const arr = [...historyTexts];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= arr.length) return;
    [arr[index], arr[targetIndex]] = [arr[targetIndex], arr[index]];
    setHistoryTexts(arr);
    setHistorySaved(false);
  };

  const handleSaveHistory = () => {
    // 로컬스토리지에 저장 (실제로는 백엔드 API 연동 필요)
    localStorage.setItem('companyHistory', JSON.stringify(historyTexts));
    setHistorySaved(true);
    setTimeout(() => setHistorySaved(false), 2000);
  };

  if (!isLoggedIn) {
    return (
      <S.LoginWrapper>
        <S.LoginCard>
          <S.LoginLogo src="/assets/images/logo.svg" alt="KT Prime" />
          <S.LoginTitle>관리자 로그인</S.LoginTitle>
          <S.LoginForm onSubmit={handleLogin}>
            <S.LoginInput
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="관리자 비밀번호"
              autoFocus
            />
            {loginError && <S.LoginError>{loginError}</S.LoginError>}
            <S.LoginButton type="submit">로그인</S.LoginButton>
          </S.LoginForm>
        </S.LoginCard>
      </S.LoginWrapper>
    );
  }

  return (
    <S.AdminWrapper>
      <S.Sidebar>
        <S.SidebarLogo src="/assets/images/logo.svg" alt="KT Prime" />
        <S.SidebarTitle>관리자 페이지</S.SidebarTitle>
        <S.SidebarMenu>
          <S.SidebarItem $active={tab === 'applications'} onClick={() => setTab('applications')}>
            지원서 관리
          </S.SidebarItem>
          <S.SidebarItem $active={tab === 'history'} onClick={() => setTab('history')}>
            회사 연혁 관리
          </S.SidebarItem>
        </S.SidebarMenu>
        <S.LogoutButton onClick={() => setIsLoggedIn(false)}>로그아웃</S.LogoutButton>
      </S.Sidebar>

      <S.MainContent>
        {tab === 'applications' && (
          <S.Section>
            <S.SectionHeader>
              <S.SectionTitle>지원서 목록</S.SectionTitle>
              <S.RefreshButton onClick={fetchApplications}>새로고침</S.RefreshButton>
            </S.SectionHeader>

            {loading ? (
              <S.LoadingText>불러오는 중...</S.LoadingText>
            ) : (
              <S.TwoPanel>
                <S.AppList>
                  {applications.length === 0 ? (
                    <S.EmptyText>지원서가 없습니다.</S.EmptyText>
                  ) : (
                    applications.map(app => (
                      <S.AppCard
                        key={app.id}
                        $selected={selectedApp?.id === app.id}
                        onClick={() => setSelectedApp(app)}
                      >
                        <S.AppCardTop>
                          <S.AppName>{app.userName}</S.AppName>
                          <S.StatusBadge $color={STATUS_LABELS[app.status]?.color}>
                            {app.status}
                          </S.StatusBadge>
                        </S.AppCardTop>
                        <S.AppEmail>{app.userEmail}</S.AppEmail>
                        <S.AppMeta>{app.branch} · {app.careerType}</S.AppMeta>
                      </S.AppCard>
                    ))
                  )}
                </S.AppList>

                {selectedApp && (
                  <S.AppDetail>
                    <S.DetailTitle>{selectedApp.userName} 지원서</S.DetailTitle>
                    <S.DetailSection>
                      <S.DetailRow>
                        <S.DetailLabel>이메일</S.DetailLabel>
                        <S.DetailValue>{selectedApp.userEmail}</S.DetailValue>
                      </S.DetailRow>
                      <S.DetailRow>
                        <S.DetailLabel>연락처</S.DetailLabel>
                        <S.DetailValue>{selectedApp.userPhone}</S.DetailValue>
                      </S.DetailRow>
                      <S.DetailRow>
                        <S.DetailLabel>생년월일</S.DetailLabel>
                        <S.DetailValue>{selectedApp.userBirthDate || '-'}</S.DetailValue>
                      </S.DetailRow>
                      <S.DetailRow>
                        <S.DetailLabel>주소</S.DetailLabel>
                        <S.DetailValue>
                          {selectedApp.userAddress || '-'}
                          {selectedApp.userAddressDetail && ` ${selectedApp.userAddressDetail}`}
                        </S.DetailValue>
                      </S.DetailRow>
                      <S.DetailRow>
                        <S.DetailLabel>경력구분</S.DetailLabel>
                        <S.DetailValue>{selectedApp.careerType}</S.DetailValue>
                      </S.DetailRow>
                      <S.DetailRow>
                        <S.DetailLabel>지원매장</S.DetailLabel>
                        <S.DetailValue>{selectedApp.branch || '-'}</S.DetailValue>
                      </S.DetailRow>
                      <S.DetailRow>
                        <S.DetailLabel>병역</S.DetailLabel>
                        <S.DetailValue>{selectedApp.militaryService || '-'}</S.DetailValue>
                      </S.DetailRow>
                      <S.DetailRow>
                        <S.DetailLabel>현재 상태</S.DetailLabel>
                        <S.StatusBadge $color={STATUS_LABELS[selectedApp.status]?.color}>
                          {selectedApp.status}
                        </S.StatusBadge>
                      </S.DetailRow>
                    </S.DetailSection>

                    <S.ActionTitle>상태 변경</S.ActionTitle>
                    <S.ActionButtons>
                      <S.ActionButton
                        $color="#f57c00"
                        onClick={() => handleStatusUpdate(selectedApp.id, '서류검토중')}
                      >
                        서류검토중
                      </S.ActionButton>
                      <S.ActionButton
                        $color="#7b1fa2"
                        onClick={() => handleStatusUpdate(selectedApp.id, '면접대기')}
                      >
                        면접 연락
                      </S.ActionButton>
                      <S.ActionButton
                        $color="#2e7d32"
                        onClick={() => handleStatusUpdate(selectedApp.id, '합격')}
                      >
                        합격 통보
                      </S.ActionButton>
                      <S.ActionButton
                        $color="#c62828"
                        onClick={() => handleStatusUpdate(selectedApp.id, '불합격')}
                      >
                        불합격 통보
                      </S.ActionButton>
                    </S.ActionButtons>
                  </S.AppDetail>
                )}
              </S.TwoPanel>
            )}
          </S.Section>
        )}

        {tab === 'history' && (
          <S.Section>
            <S.SectionHeader>
              <S.SectionTitle>회사 연혁 관리</S.SectionTitle>
              <S.SaveButton onClick={handleSaveHistory}>
                {historySaved ? '저장됨 ✓' : '저장'}
              </S.SaveButton>
            </S.SectionHeader>
            <S.HistoryList>
              {historyTexts.map((text, index) => (
                <S.HistoryItem key={index}>
                  <S.HistoryText>{text}</S.HistoryText>
                  <S.HistoryActions>
                    <S.IconButton onClick={() => handleHistoryReorder(index, 'up')} disabled={index === 0}>↑</S.IconButton>
                    <S.IconButton onClick={() => handleHistoryReorder(index, 'down')} disabled={index === historyTexts.length - 1}>↓</S.IconButton>
                    <S.DeleteButton onClick={() => handleRemoveHistory(index)}>삭제</S.DeleteButton>
                  </S.HistoryActions>
                </S.HistoryItem>
              ))}
            </S.HistoryList>
            <S.AddHistoryRow>
              <S.AddHistoryInput
                type="text"
                value={newHistoryText}
                onChange={(e) => setNewHistoryText(e.target.value)}
                placeholder="예) 2026년 3월  신규 지점 오픈"
                onKeyDown={(e) => e.key === 'Enter' && handleAddHistory()}
              />
              <S.AddButton onClick={handleAddHistory}>추가</S.AddButton>
            </S.AddHistoryRow>
            <S.HistoryNote>
              * 저장 시 브라우저 로컬스토리지에 저장됩니다. 메인 페이지에 반영하려면 백엔드 DB 연동이 필요합니다.
            </S.HistoryNote>
          </S.Section>
        )}
      </S.MainContent>
    </S.AdminWrapper>
  );
};

export default Admin;
