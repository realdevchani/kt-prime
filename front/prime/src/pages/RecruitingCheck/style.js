import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  to { transform: rotate(360deg); }
`;

const S = {};

S.Wrapper = styled.div`
  min-height: calc(100vh - 56px);
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f8f9fa;
  padding: 2rem 1rem;
  box-sizing: border-box;
`;

S.Card = styled.div`
  background: #ffffff;
  border-radius: 16px;
  padding: 3rem 2.5rem;
  width: 100%;
  max-width: min(480px, calc(100vw - 2rem));
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  box-sizing: border-box;
  overflow-wrap: break-word;
  word-break: keep-all;
`;

S.Logo = styled.img`
  height: 48px;
  object-fit: contain;
`;

S.Title = styled.h1`
  font-size: 1.5rem;
  font-weight: 700;
  color: #111;
  text-align: center;
  margin: 0;
`;

S.Description = styled.p`
  font-size: 0.95rem;
  color: #555;
  text-align: center;
  line-height: 1.6;
  margin: 0;
  width: 100%;
  max-width: 100%;
  overflow-wrap: break-word;
  word-break: keep-all;
`;

S.Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

S.Label = styled.label`
  font-size: 0.875rem;
  font-weight: 600;
  color: #333;
`;

S.Input = styled.input`
  width: 100%;
  padding: 0.875rem 1rem;
  border: 1.5px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1rem;
  color: #111;
  outline: none;
  box-sizing: border-box;
  transition: border-color 0.2s;

  &:focus {
    border-color: #1187CF;
  }
`;

S.ErrorMessage = styled.p`
  font-size: 0.8rem;
  color: #e53935;
  margin: 0;
`;

S.SubmitButton = styled.button`
  width: 100%;
  padding: 0.875rem;
  background: #1187CF;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  margin-top: 0.5rem;
  transition: background 0.2s;

  &:hover {
    background: #0e70b0;
  }
`;

S.CheckingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 2rem 0;
`;

S.Spinner = styled.div`
  width: 40px;
  height: 40px;
  border: 3px solid #e0e0e0;
  border-top-color: #1187CF;
  border-radius: 50%;
  animation: ${spin} 0.8s linear infinite;
`;

S.ResultWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  width: 100%;
`;

S.ResultIcon = styled.div`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.75rem;
  font-weight: 700;
  background: ${({ $type }) => $type === 'success' ? '#e8f5e9' : '#fff3e0'};
  color: ${({ $type }) => $type === 'success' ? '#43a047' : '#f57c00'};
`;

S.ResultTitle = styled.h2`
  font-size: 1.2rem;
  font-weight: 700;
  color: #111;
  text-align: center;
  margin: 0;
`;

S.ResultDescription = styled.p`
  font-size: 0.9rem;
  color: #555;
  text-align: center;
  line-height: 1.7;
  margin: 0;
  width: 100%;
  max-width: 100%;
  overflow-wrap: break-word;
  word-break: keep-all;
`;

S.ProceedButton = styled.button`
  width: 100%;
  padding: 0.875rem;
  background: #1187CF;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  margin-top: 0.5rem;
  transition: background 0.2s;

  &:hover {
    background: #0e70b0;
  }
`;

S.BackButton = styled.button`
  width: 100%;
  padding: 0.875rem;
  background: transparent;
  color: #666;
  border: 1.5px solid #e0e0e0;
  border-radius: 8px;
  font-size: 0.95rem;
  cursor: pointer;
  transition: border-color 0.2s, color 0.2s;

  &:hover {
    border-color: #999;
    color: #333;
  }
`;

export default S;
