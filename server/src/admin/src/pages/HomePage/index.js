import React, { memo } from "react";
import styled from "styled-components";
import { useIntl } from "react-intl";

const Wrapper = styled.div`
  display: flex;
  min-height: 100vh;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h2`
  font-size: 34px;
`;

const HomePage = () => {
  const { formatMessage } = useIntl();

  return (
    <Wrapper>
      <Title>
        {formatMessage({
          id: "Admin.pages.homepage.title",
        })}
      </Title>
    </Wrapper>
  );
};

export default memo(HomePage);
