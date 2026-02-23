import styled from "styled-components";

const S = {};

S.RecruitingSection = styled.section`
  width: 100%;
  min-height: 100vh;
  padding: 8rem 1rem 4rem;
  background: #ffffff;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 6rem 1rem 3rem;
  }
`;

S.Container = styled.div`
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
`;

S.Title = styled.h1`
  font-family: 'pretendard', sans-serif;
  font-size: clamp(1.75rem, 3vw + 0.5rem, 2.5rem);
  font-weight: 700;
  text-align: center;
  color: #1187CF;
  margin-bottom: 2rem;
  letter-spacing: -0.02em;

  @media (max-width: 768px) {
    font-size: clamp(1.5rem, 2.5vw + 0.5rem, 2rem);
    margin-bottom: 1.5rem;
  }
`;

S.SelectionSection = styled.div`
  margin-bottom: 3rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid #e0e0e0;
`;

S.SelectionRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

S.SelectionGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

S.SelectionLabel = styled.label`
  font-family: 'pretendard', sans-serif;
  font-size: 0.9375rem;
  font-weight: 600;
  color: #333333;
  letter-spacing: -0.01em;
`;

S.ToggleGroup = styled.div`
  display: flex;
  gap: 0;
  border-bottom: 1px solid #e0e0e0;
  position: relative;
`;

S.ToggleButton = styled.button`
  flex: 1;
  padding: 0.75rem 0;
  border: none;
  border-bottom: ${props => props.$isActive ? '2px solid #1187CF' : 'none'};
  background: transparent;
  color: ${props => props.$isActive ? '#1187CF' : '#333333'};
  font-family: 'pretendard', sans-serif;
  font-size: 0.9375rem;
  font-weight: ${props => props.$isActive ? '600' : '400'};
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  margin-bottom: -1px;

  &:hover {
    color: #1187CF;
  }
`;

S.Select = styled.select`
  width: 100%;
  padding: 0.75rem 0;
  border: none;
  border-bottom: 1px solid #e0e0e0;
  font-family: 'pretendard', sans-serif;
  font-size: 0.9375rem;
  color: #333333;
  box-sizing: border-box;
  transition: border-color 0.3s ease;
  background: transparent;
  cursor: pointer;

  &:focus {
    outline: none;
    border-bottom-color: #1187CF;
  }

  option {
    background: #ffffff;
    color: #333333;
  }
`;

S.Form = styled.form`
  background: transparent;
  padding: 0;
  box-shadow: none;

  @media (max-width: 768px) {
    padding: 0;
  }
`;

S.Section = styled.div`
  margin-bottom: 3rem;

  &:last-of-type {
    margin-bottom: 0;
  }
`;

S.SectionTitle = styled.h2`
  font-family: 'pretendard', sans-serif;
  font-size: 1.5rem;
  font-weight: 700;
  color: #333333;
  margin-bottom: 1.5rem;
  letter-spacing: -0.01em;

  @media (max-width: 768px) {
    font-size: 1.25rem;
    margin-bottom: 1.25rem;
  }
`;

S.FormGroup = styled.div`
  margin-bottom: 1.5rem;

  &:last-child {
    margin-bottom: 0;
  }
`;

S.FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

S.Label = styled.label`
  display: block;
  font-family: 'pretendard', sans-serif;
  font-size: 0.9375rem;
  font-weight: 600;
  color: #333333;
  margin-bottom: 0.5rem;
  letter-spacing: -0.01em;
`;

S.Required = styled.span`
  color: #ff0000;
`;

S.Input = styled.input`
  width: 100%;
  padding: 0.75rem 0;
  border: none;
  border-bottom: 1px solid #e0e0e0;
  font-family: 'pretendard', sans-serif;
  font-size: 0.9375rem;
  color: #333333;
  box-sizing: border-box;
  transition: border-color 0.3s ease;
  background: transparent;

  &:focus {
    outline: none;
    border-bottom-color: #1187CF;
  }

  &::placeholder {
    color: #999999;
  }
`;

S.Textarea = styled.textarea`
  width: 100%;
  padding: 0.75rem 0;
  border: none;
  border-bottom: 1px solid #e0e0e0;
  font-family: 'pretendard', sans-serif;
  font-size: 0.9375rem;
  color: #333333;
  box-sizing: border-box;
  resize: vertical;
  transition: border-color 0.3s ease;
  background: transparent;
  min-height: 100px;

  &:focus {
    outline: none;
    border-bottom-color: #1187CF;
  }
`;

S.AddressRow = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 0.5rem;
  align-items: start;
`;

S.Button = styled.button`
  width: 130px;
  height: 40px;
  padding: 10px 25px;
  border: 2px solid #000;
  font-family: 'pretendard', sans-serif;
  font-weight: 500;
  background: transparent;
  cursor: pointer;
  transition: all 0.3s ease;
  color: #000;
  white-space: nowrap;

  &:hover {
    background: #000;
    color: #ffffff;
  }

  @media (max-width: 768px) {
    width: 100px;
    height: 38px;
    padding: 8px 20px;
    font-size: 0.875rem;
  }
`;

S.SubmitButton = styled.button`
  width: 100%;
  height: 50px;
  padding: 0;
  border: 2px solid #000;
  font-family: 'pretendard', sans-serif;
  font-weight: 600;
  font-size: 1.125rem;
  background: transparent;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  display: block;
  margin: 3rem auto 0;
  color: #000;
  z-index: 2;
  line-height: 50px;

  &:hover {
    border: none;
  }

  &:before,
  &:after {
    position: absolute;
    content: "";
    width: 0%;
    height: 0%;
    border: 2px solid;
    z-index: -1;
    transition: all 0.3s ease;
  }

  &:before {
    top: 0;
    left: 0;
    border-bottom-color: transparent;
    border-right-color: transparent;
    border-top-color: #000;
    border-left-color: #000;
  }

  &:after {
    bottom: 0;
    right: 0;
    border-top-color: transparent;
    border-left-color: transparent;
    border-bottom-color: #000;
    border-right-color: #000;
  }

  &:hover:before,
  &:hover:after {
    border-color: #000;
    height: 100%;
    width: 100%;
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

S.EducationItem = styled.div`
  background: #f9f9f9;
  border-radius: 12px;
  padding: 2rem;
  margin-bottom: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  min-height: 250px;

  @media (max-width: 768px) {
    padding: 1.5rem;
    min-height: 220px;
  }
`;

S.ExperienceItem = styled.div`
  background: #f9f9f9;
  border-radius: 12px;
  padding: 2rem;
  margin-bottom: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  min-height: 300px;

  @media (max-width: 768px) {
    padding: 1.5rem;
    min-height: 280px;
  }
`;

S.ItemContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  flex: 1;
`;

S.ItemActions = styled.div`
  display: flex;
  justify-content: flex-end;
  order: -1;
  margin-bottom: 0.5rem;
`;

S.AddButton = styled.button`
  width: 100%;
  padding: 0.75rem;
  border: 1px dashed #1187CF;
  border-radius: 8px;
  background: transparent;
  color: #1187CF;
  font-family: 'pretendard', sans-serif;
  font-size: 0.9375rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #1187CF;
    color: #ffffff;
  }
`;

S.RemoveButton = styled.button`
  padding: 0.5rem 1rem;
  border: 1px solid #ff4444;
  border-radius: 6px;
  background: transparent;
  color: #ff4444;
  font-family: 'pretendard', sans-serif;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.3s ease;
  width: fit-content;

  &:hover {
    background: #ff4444;
    color: #ffffff;
  }
`;

S.RadioGroup = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

S.RadioLabel = styled.label`
  display: flex;
  align-items: center;
  font-family: 'pretendard', sans-serif;
  font-size: 0.9375rem;
  color: #333333;
  cursor: pointer;
`;

S.Radio = styled.input`
  margin-right: 0.5rem;
  cursor: pointer;
`;

S.AgreeItem = styled.div`
  margin-bottom: 2rem;
  padding: 1.5rem;
  background: #f9f9f9;
  border-radius: 12px;

  &:last-child {
    margin-bottom: 0;
  }
`;

S.CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  font-family: 'pretendard', sans-serif;
  font-size: 1rem;
  font-weight: 600;
  color: #333333;
  margin-bottom: 1rem;
  cursor: pointer;
`;

S.Checkbox = styled.input`
  margin-right: 0.75rem;
  width: 20px;
  height: 20px;
  cursor: pointer;
`;

S.AgreeContent = styled.div`
  font-family: 'pretendard', sans-serif;
  font-size: 0.875rem;
  line-height: 1.6;
  color: #666666;
  padding-left: 2.75rem;
  white-space: pre-line;

  @media (max-width: 768px) {
    padding-left: 0;
    margin-top: 0.5rem;
  }
`;

S.FileUploadContainer = styled.div`
  margin-bottom: 1rem;
`;

S.FileUploadLabel = styled.label`
  display: block;
  cursor: pointer;
`;

S.FileUploadPlaceholder = styled.div`
  width: 100%;
  max-width: 300px;
  height: 400px;
  border: 2px dashed #e0e0e0;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #f9f9f9;
  transition: all 0.3s ease;

  &:hover {
    border-color: #1187CF;
    background: #f0f8ff;
  }
`;

S.FileUploadIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1rem;
`;

S.FileUploadText = styled.div`
  font-family: 'pretendard', sans-serif;
  font-size: 1rem;
  font-weight: 500;
  color: #333333;
  margin-bottom: 0.5rem;
`;

S.FileUploadHint = styled.div`
  font-family: 'pretendard', sans-serif;
  font-size: 0.875rem;
  color: #999999;
`;

S.FileInput = styled.input`
  display: none;
`;

S.FilePreview = styled.div`
  width: 100%;
  max-width: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

S.FilePreviewImage = styled.img`
  width: 100%;
  max-width: 300px;
  height: 400px;
  object-fit: cover;
  border-radius: 12px;
  border: 2px solid #e0e0e0;
  margin-bottom: 0.5rem;
`;

S.FileName = styled.div`
  font-family: 'pretendard', sans-serif;
  font-size: 0.875rem;
  color: #666666;
  text-align: center;
`;

export default S;
