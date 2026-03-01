import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import S from './style';

const RecruitingCheck = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [step, setStep] = useState('input'); // input | checking | result
  const [hasApplied, setHasApplied] = useState(false);
  const [error, setError] = useState('');

  const handleCheck = async (e) => {
    e.preventDefault();
    if (!email) {
      setError('이메일을 입력해주세요.');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('올바른 이메일 형식이 아닙니다.');
      return;
    }

    setError('');
    setStep('checking');

    try {
      const response = await fetch(
        `http://localhost:10000/api/recruiting/check-email?email=${encodeURIComponent(email)}`
      );
      const data = await response.json();
      setHasApplied(data.hasApplied);
      setStep('result');
    } catch (err) {
      setError('확인 중 오류가 발생했습니다. 다시 시도해주세요.');
      setStep('input');
    }
  };

  const handleProceed = () => {
    navigate('/recruiting', { state: { email } });
  };

  return (
    <S.Wrapper>
      <S.Card>
        <S.Logo src="/assets/images/logo.svg" alt="KT Prime Logo" />
        <S.Title>입사 지원</S.Title>

        {step === 'input' && (
          <>
            <S.Description>
              지원 전, 이메일을 입력하여 기존 지원 내역을 확인해주세요.
            </S.Description>
            <S.Form onSubmit={handleCheck}>
              <S.Label>이메일</S.Label>
              <S.Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@email.com"
                autoFocus
              />
              {error && <S.ErrorMessage>{error}</S.ErrorMessage>}
              <S.SubmitButton type="submit">지원 내역 확인</S.SubmitButton>
            </S.Form>
          </>
        )}

        {step === 'checking' && (
          <S.CheckingWrapper>
            <S.Spinner />
            <S.Description>확인 중입니다...</S.Description>
          </S.CheckingWrapper>
        )}

        {step === 'result' && (
          <>
            {hasApplied ? (
              <S.ResultWrapper>
                <S.ResultIcon $type="warning">!</S.ResultIcon>
                <S.ResultTitle>이미 지원한 내역이 있습니다</S.ResultTitle>
                <S.ResultDescription>
                  <strong>{email}</strong>으로 이미 지원하셨습니다.<br />
                  지원서는 1인 1회만 제출 가능합니다.
                </S.ResultDescription>
                <S.BackButton onClick={() => setStep('input')}>다른 이메일로 확인</S.BackButton>
              </S.ResultWrapper>
            ) : (
              <S.ResultWrapper>
                <S.ResultIcon $type="success">✓</S.ResultIcon>
                <S.ResultTitle>지원 가능합니다</S.ResultTitle>
                <S.ResultDescription>
                  <strong>{email}</strong>으로 지원한 내역이 없습니다.<br />
                  지원서를 작성해주세요.
                </S.ResultDescription>
                <S.ProceedButton onClick={handleProceed}>지원서 작성하기</S.ProceedButton>
                <S.BackButton onClick={() => setStep('input')}>다시 확인</S.BackButton>
              </S.ResultWrapper>
            )}
          </>
        )}
      </S.Card>
    </S.Wrapper>
  );
};

export default RecruitingCheck;
