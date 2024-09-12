import React, { useState } from 'react'
import Header from '@/components/theLayout/theHeader/Header'
import Category from '@/components/theCommon/Category'
import { css } from '@emotion/react'
import { Colors, FontSize, FontWeight } from '@/styles/Theme'
import { GrAddCircle } from "react-icons/gr" 

function Radio({ children, name, value, defaultChecked }) {
  return (
    <label>
      <input type="radio" name={name} value={value} defaultChecked={defaultChecked} />
      {children}
    </label>
  )
}
const AddPlaylist = () => {
  return (
    <>
      <Header title="Add Playlist" />
      <div css={DivContainer}>
        <div css={TitleContainer}>동영상 링크</div>
        <input type="text" placeholder="동영상 주소를 입력해주세요." css={InputContainer} />
        <button css={AddButton}><GrAddCircle size={24} color="#1E1E1E" /></button>
      </div>

      <div css={DivContainer}>
        <div css={TitleContainer}>플레이리스트 제목</div>
        <input type="text" placeholder="제목을 입력해주세요." css={InputContainer} />
      </div>

      <div css={DivContainer}>
        <div css={TitleContainer}>설명</div>
        <input type="text" placeholder="설명을 입력해주세요." css={InputContainer} />
      </div>

      <div css={DivContainer}>
        <div css={TitleContainer}>카테고리 설정</div>
        <Category />
      </div>

      <div css={DivContainer}>
        <div css={TitleContainer}>공개 설정</div>
        <Radio name="setting" defaultChecked>공개</Radio>
        <Radio name="setting">비공개</Radio>
      </div>
    </>
  )
}

const DivContainer = css`
  position: relative;
  display: inline-block;
  width: 315px;
`
const TitleContainer = css`
  font-size: ${FontSize.md};
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`
const InputContainer = css`
  border: none;
  border-bottom: 2px solid #EBEBEB;
  outline: none;
  font-size: ${FontSize.md};
  font-weight: ${FontWeight.medium};
  color: ${Colors.black};
  height: 30px;
  width: 100%;
  letter-spacing: -0.2px;
  padding-left: 10px;
  padding-right: 40px;
  box-sizing: border-box;
  margin-bottom: 35px;
`
const AddButton = css`
  position: absolute;
  right: 0;
  bottom: 50px;
  transform: translateY(50%);
  border: none;
  background-color: transparent;
  cursor: pointer;
`

export default AddPlaylist;
